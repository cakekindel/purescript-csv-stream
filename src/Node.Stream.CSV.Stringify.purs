module Node.Stream.CSV.Stringify where

import Prelude

import Control.Monad.Rec.Class (class MonadRec, whileJust)
import Control.Monad.ST.Global as ST
import Data.Array as Array
import Data.Array.ST as Array.ST
import Data.CSV.Record (class WriteCSVRecord, writeCSVRecord)
import Data.Either (Either(..), blush)
import Data.Foldable (class Foldable, fold)
import Data.Maybe (Maybe(..))
import Data.String.Regex (Regex)
import Data.Traversable (for_)
import Effect (Effect)
import Effect.Aff (Canceler(..), makeAff)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Class (liftEffect)
import Foreign (Foreign, unsafeToForeign)
import Foreign.Object (Object)
import Foreign.Object as Object
import Node.EventEmitter as Event
import Node.Stream (Read, Stream, Write)
import Node.Stream as Stream
import Prim.Row (class Union)
import Prim.RowList (class RowToList)
import Record.Extra (class Keys, keys)
import Type.Prelude (Proxy(..))
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
make :: forall @r rl @config @missing @extra. Keys rl => RowToList r rl => WriteCSVRecord r rl => Union config missing (Config extra) => { | config } -> Effect (CSVStringifier r ())
make = makeImpl <<< unsafeToForeign <<< Object.union (recordToForeign {columns: Array.fromFoldable $ keys (Proxy @r)}) <<< recordToForeign

-- | Synchronously stringify a collection of records
stringify :: forall @r rl f m @config missing extra. MonadAff m => MonadRec m => Keys rl => Foldable f => RowToList r rl => WriteCSVRecord r rl => Union config missing (Config extra) => { | config } -> f { | r } -> m String
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

-- | Loop until the stream is closed, invoking the callback with each chunk of stringified CSV text.
foreach :: forall m r x. MonadAff m => MonadRec m => CSVStringifier r x -> (String -> m Unit) -> m Unit
foreach stream cb = whileJust do
  isReadable <- liftEffect $ Stream.readable stream
  liftAff $ when (not isReadable) $ makeAff \res -> do
    stop <- flip (Event.once Stream.readableH) stream $ res $ Right unit
    pure $ Canceler $ const $ liftEffect stop
  whileJust do
    s <- liftEffect $ (join <<< map blush) <$> Stream.readEither stream
    for_ s cb
    pure $ void s
  isClosed <- liftEffect $ Stream.closed stream
  pure $ if isClosed then Nothing else Just unit

-- | Read the stringified chunks until end-of-stream, returning the entire CSV string.
readAll :: forall r a m. MonadAff m => MonadRec m => CSVStringifier r a -> m String
readAll stream = do
  chunks <- liftEffect $ ST.toEffect $ Array.ST.new
  foreach stream $ void <<< liftEffect <<< ST.toEffect <<< flip Array.ST.push chunks
  chunks' <- liftEffect $ ST.toEffect $ Array.ST.unsafeFreeze chunks
  pure $ fold chunks'
