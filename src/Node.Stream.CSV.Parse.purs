module Node.Stream.CSV.Parse where

import Prelude hiding (join)

import Data.Nullable (Nullable)
import Effect (Effect)
import Effect.Uncurried (mkEffectFn1)
import Foreign (Foreign, unsafeToForeign)
import Foreign.Object (Object)
import Foreign.Object (union) as Object
import Node.Buffer (Buffer)
import Node.EventEmitter (EventHandle(..))
import Node.EventEmitter.UtilTypes (EventHandle1)
import Node.Stream (Read, Stream, Write)
import Node.Stream.Object (Transform) as Object
import Prim.Row (class Union)
import Unsafe.Coerce (unsafeCoerce)

data CSVRead

-- | Stream transforming chunks of a CSV file
-- | into parsed purescript objects.
-- |
-- | The CSV contents may be piped into this stream
-- | as Buffer or String chunks.
type CSVParser :: Row Type -> Type
type CSVParser r = Stream (read :: Read, write :: Write, csv :: CSVRead | r)

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

-- | Create a CSVParser
make :: forall @config @missing @extra. Union config missing (Config extra) => { | config } -> Effect (CSVParser ())
make = makeImpl <<< unsafeToForeign <<< Object.union (recordToForeign { columns: false, cast: false, cast_date: false }) <<< recordToForeign

toObjectStream :: CSVParser () -> Object.Transform Buffer (Array String)
toObjectStream = unsafeCoerce

-- | `data` event. Emitted when a CSV record has been parsed.
dataH :: forall a. EventHandle1 (CSVParser a) (Array String)
dataH = EventHandle "data" mkEffectFn1

-- | FFI
foreign import makeImpl :: forall r. Foreign -> Effect (Stream r)

-- | FFI
foreign import readImpl :: forall r. Stream r -> Effect (Nullable (Array String))

-- | FFI
recordToForeign :: forall r. Record r -> Object Foreign
recordToForeign = unsafeCoerce
