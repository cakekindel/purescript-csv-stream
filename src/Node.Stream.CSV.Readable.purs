module Node.Stream.CSV.Readable where

import Prelude

import Control.Monad.Error.Class (liftEither)
import Control.Monad.Except (runExcept)
import Control.Monad.Maybe.Trans (MaybeT(..), runMaybeT)
import Control.Monad.Rec.Class (whileJust)
import Control.Monad.ST.Global as ST
import Data.Array.ST as Array.ST
import Data.Bifunctor (lmap)
import Data.CSV.Record (class ReadCSVRecord, readCSVRecord)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Nullable (Nullable)
import Data.Nullable as Nullable
import Data.Traversable (for_)
import Effect (Effect)
import Effect.Aff (Aff, makeAff)
import Effect.Class (liftEffect)
import Effect.Exception (error)
import Effect.Uncurried (mkEffectFn1)
import Foreign (Foreign, unsafeToForeign)
import Foreign.Object (Object)
import Foreign.Object as Object
import Node.EventEmitter (EventHandle(..))
import Node.EventEmitter as Event
import Node.EventEmitter.UtilTypes (EventHandle1)
import Node.Stream (Read, Stream, Write)
import Node.Stream as Stream
import Prim.Row (class Union)
import Prim.RowList (class RowToList)
import Unsafe.Coerce (unsafeCoerce)

data CSVRead

-- | Stream transforming chunks of a CSV file
-- | into parsed purescript objects.
-- |
-- | The CSV contents may be piped into this stream
-- | as Buffer or String encoded chunks.
-- |
-- | Records can be read with `read` when `Node.Stream.readable`
-- | is true.
type CSVParser :: Row Type -> Row Type -> Type
type CSVParser a r = Stream (read :: Read, write :: Write, csv :: CSVRead | r)

-- | https://csv.js.org/parse/options/
type Config r =
  ( bom :: Boolean
  , group_columns_by_name :: Boolean
  , comment :: String
  , comment_no_infix :: Boolean
  , delimiter :: String
  , encoding :: String
  , escape :: String
  , from :: Int
  , from_line :: Int
  , ignore_last_delimiters :: Boolean
  , info :: Boolean
  , max_record_size :: Int
  , quote :: String
  , raw :: Boolean
  , record_delimiter :: String
  , relax_column_count :: Boolean
  , skip_empty_lines :: Boolean
  , skip_records_with_empty_values :: Boolean
  , skip_records_with_error :: Boolean
  , to :: Int
  , to_line :: Int
  , trim :: Boolean
  , ltrim :: Boolean
  , rtrim :: Boolean
  | r
  )

make :: forall @r rl config missing extra. ReadCSVRecord r rl => Union config missing (Config extra) => { | config } -> Effect (CSVParser r ())
make = makeImpl <<< unsafeToForeign <<< Object.union (recordToForeign {columns: true, cast: false, cast_date: false}) <<< recordToForeign

-- | Reads a parsed record from the stream.
-- |
-- | Returns `Nothing` when either:
-- | - The internal buffer of parsed records has been exhausted, but there will be more (`Node.Stream.readable` and `Node.Stream.closed` are both `false`)
-- | - All records have been processed (`Node.Stream.closed` is `true`)
read :: forall @r rl a. RowToList r rl => ReadCSVRecord r rl => CSVParser r a -> Effect (Maybe { | r })
read stream = runMaybeT do
  raw :: Array String <- MaybeT $ Nullable.toMaybe <$> readImpl stream
  liftEither $ lmap (error <<< show) $ runExcept $ readCSVRecord @r @rl raw

-- | Collect all parsed records into an array
readAll :: forall @r rl a. RowToList r rl => ReadCSVRecord r rl => CSVParser r a -> Aff (Array { | r })
readAll stream = do
  records <- liftEffect $ ST.toEffect $ Array.ST.new

  whileJust do
    isReadable <- liftEffect $ Stream.readable stream
    when (not isReadable) $ makeAff \res -> mempty <* flip (Event.once Stream.readableH) stream $ res $ Right unit
    liftEffect $ whileJust do
      r <- read @r stream
      for_ r \r' -> ST.toEffect $ Array.ST.push r' records
      pure $ void r

    isClosed <- liftEffect $ Stream.closed stream
    pure $ if isClosed then Nothing else Just unit

  liftEffect $ ST.toEffect $ Array.ST.unsafeFreeze records

-- | `data` event. Emitted when a CSV record has been parsed.
dataH :: forall r a. EventHandle1 (CSVParser r a) { | r }
dataH = EventHandle "data" mkEffectFn1

-- | FFI
foreign import makeImpl :: forall r. Foreign -> Effect (Stream r)

-- | FFI
foreign import readImpl :: forall r. Stream r -> Effect (Nullable (Array String))

-- | FFI
recordToForeign :: forall r. Record r -> Object Foreign
recordToForeign = unsafeCoerce

