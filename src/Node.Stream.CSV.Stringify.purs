module Node.Stream.CSV.Stringify where

import Prelude

import Control.Monad.Rec.Class (whileJust)
import Control.Monad.ST.Global as ST
import Data.Array.ST as Array.ST
import Data.CSV.Record (class WriteCSVRecord, writeCSVRecord)
import Data.Either (Either(..), blush)
import Data.Foldable (class Foldable, fold)
import Data.Maybe (Maybe(..))
import Data.String.Regex (Regex)
import Data.Traversable (for_)
import Effect (Effect)
import Effect.Aff (Aff, makeAff)
import Effect.Class (liftEffect)
import Foreign (Foreign, unsafeToForeign)
import Foreign.Object (Object)
import Foreign.Object as Object
import Node.EventEmitter as Event
import Node.Stream (Read, Stream, Write)
import Node.Stream as Stream
import Prim.Row (class Union)
import Prim.RowList (class RowToList)
import Unsafe.Coerce (unsafeCoerce)

data CSVWrite

-- | Stream transforming rows of stringified CSV values
-- | to CSV-formatted rows.
-- |
-- | Write rows to the stream using `write`.
-- |
-- | Stringified rows are emitted on the `Readable` end as string
-- | chunks, meaning it can be treated as a `Node.Stream.Readable`
-- | that has had `setEncoding UTF8` invoked on it.
type CSVStringifier :: Row Type -> Row Type -> Type
type CSVStringifier a r = Stream (read :: Read, write :: Write, csv :: CSVWrite | r)

-- | https://csv.js.org/stringify/options/
type Config r =
  ( bom :: Boolean
  , group_columns_by_name :: Boolean
  , delimiter :: String
  , record_delimiter :: String
  , escape :: String
  , escape_formulas :: Boolean
  , header :: Boolean
  , quote :: String
  , quoted :: Boolean
  , quoted_empty :: Boolean
  , quoted_match :: Regex
  , quoted_string :: Boolean
  | r
  )

foreign import makeImpl :: forall r. Foreign -> Effect (Stream r)
foreign import writeImpl :: forall r. Stream r -> Array String -> Effect Unit

recordToForeign :: forall r. Record r -> Object Foreign
recordToForeign = unsafeCoerce

-- | Create a CSVStringifier
make :: forall @r rl @config @missing @extra. RowToList r rl => WriteCSVRecord r rl => Union config missing (Config extra) => { | config } -> Effect (CSVStringifier r ())
make = makeImpl <<< unsafeToForeign <<< Object.union (recordToForeign {columns: true, cast: false, cast_date: false}) <<< recordToForeign

-- | Synchronously stringify a collection of records
stringify :: forall @r rl f @config missing extra. Foldable f => RowToList r rl => WriteCSVRecord r rl => Union config missing (Config extra) => { | config } -> f { | r } -> Aff String
stringify config records = do
  stream <- liftEffect $ make @r @config @missing @extra config
  liftEffect $ for_ records \r -> write stream r
  liftEffect $ Stream.end stream
  readAll stream

-- | Write a record to a CSVStringifier.
-- |
-- | The record will be emitted on the `Readable` end
-- | of the stream as a string chunk.
write :: forall @r rl a. RowToList r rl => WriteCSVRecord r rl => CSVStringifier r a -> { | r } -> Effect Unit
write s = writeImpl s <<< writeCSVRecord @r @rl

-- | Read the stringified chunks until end-of-stream, returning the entire CSV string.
readAll :: forall r a. CSVStringifier r a -> Aff String
readAll stream = do
  chunks <- liftEffect $ ST.toEffect $ Array.ST.new

  whileJust do
    isReadable <- liftEffect $ Stream.readable stream
    when (not isReadable) $ makeAff \res -> mempty <* flip (Event.on Stream.readableH) stream $ res $ Right unit

    liftEffect $ whileJust do
      s <- (join <<< map blush) <$> Stream.readEither stream
      for_ s \s' -> ST.toEffect $ Array.ST.push s' chunks
      pure $ void s

    isClosed <- liftEffect $ Stream.closed stream
    pure $ if isClosed then Nothing else Just unit

  chunks' <- liftEffect $ ST.toEffect $ Array.ST.unsafeFreeze chunks
  pure $ fold chunks'
