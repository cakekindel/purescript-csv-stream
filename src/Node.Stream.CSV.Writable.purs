module Node.Stream.CSV.Writable where

import Prelude

import Data.CSV.Record (class WriteCSVRecord, writeCSVRecord)
import Data.String.Regex (Regex)
import Effect (Effect)
import Foreign (Foreign, unsafeToForeign)
import Foreign.Object (Object)
import Foreign.Object as Object
import Node.Stream (Read, Stream, Write)
import Prim.Row (class Union)
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
make :: forall @r rl config missing extra. WriteCSVRecord r rl => Union config missing (Config extra) => { | config } -> Effect (CSVStringifier r ())
make = makeImpl <<< unsafeToForeign <<< Object.union (recordToForeign {columns: true, cast: false, cast_date: false}) <<< recordToForeign

-- | Write a record to a CSVStringifier.
-- |
-- | The record will be emitted on the `Readable` end
-- | of the stream as a string chunk.
write :: forall @r rl a. WriteCSVRecord r rl => CSVStringifier r a -> { | r } -> Effect Unit
write s = writeImpl s <<< writeCSVRecord @r @rl
