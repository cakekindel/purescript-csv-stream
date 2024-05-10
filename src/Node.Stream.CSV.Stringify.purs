module Node.Stream.CSV.Stringify where

import Prelude

import Data.CSV.Record (class WriteCSVRecord, writeCSVRecord)
import Data.String.Regex (Regex)
import Effect (Effect)
import Foreign (Foreign, unsafeToForeign)
import Foreign.Object (Object)
import Foreign.Object (union) as Object
import Node.Stream (Read, Stream, Write)
import Node.Stream.Object (Transform) as Object
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
type CSVStringifier :: Row Type -> Type
type CSVStringifier r = Stream (read :: Read, write :: Write, csv :: CSVWrite | r)

-- | https://csv.js.org/stringify/options/
type Config r =
  ( bom :: Boolean
  , delimiter :: String
  , record_delimiter :: String
  , escape :: String
  , escape_formulas :: Boolean
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

-- | Create a raw Transform stream that accepts chunks of `Array String`,
-- | and transforms them into string CSV rows.
-- |
-- | Requires an ordered array of column names.
make
  :: forall @config @missing @extra
  . Union config missing (Config extra)
  => Array String
  -> { | config }
  -> Effect (CSVStringifier ())
make columns =
  makeImpl
  <<< unsafeToForeign
  <<< Object.union (recordToForeign { columns, header: true })
  <<< recordToForeign

-- | Convert the raw stream to a typed ObjectStream
toObjectStream :: CSVStringifier () -> Object.Transform (Array String) String
toObjectStream = unsafeCoerce

-- | Write a record to a CSVStringifier.
-- |
-- | The record will be emitted on the `Readable` end
-- | of the stream as a string chunk.
write :: forall @r rl a. RowToList r rl => WriteCSVRecord r rl => CSVStringifier a -> { | r } -> Effect Unit
write s = writeImpl s <<< writeCSVRecord @r @rl

-- | Write a record to a CSVStringifier.
-- |
-- | The record will be emitted on the `Readable` end
-- | of the stream as a string chunk.
writeRaw :: forall a. CSVStringifier a -> Array String -> Effect Unit
writeRaw = writeImpl
