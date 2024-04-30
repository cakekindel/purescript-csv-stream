module Data.CSV.Record where

import Prelude

import Control.Monad.Error.Class (liftMaybe)
import Control.Monad.Except (Except)
import Data.Array as Array
import Data.CSV (class ReadCSV, class WriteCSV, readCSV, writeCSV)
import Data.List.NonEmpty (NonEmptyList)
import Data.Maybe (fromMaybe)
import Data.Symbol (class IsSymbol)
import Foreign (ForeignError(..))
import Prim.Row (class Cons, class Lacks)
import Prim.RowList (class RowToList, Cons, Nil, RowList)
import Record as Record
import Type.Prelude (Proxy(..))

class WriteCSVRecord :: Row Type -> RowList Type -> Constraint
class RowToList r rl <= WriteCSVRecord r rl | rl -> r where
  writeCSVRecord :: { | r } -> Array String

instance (RowToList r (Cons k v tailrl), IsSymbol k, WriteCSV v, Lacks k tail, Cons k v tail r, WriteCSVRecord tail tailrl) => WriteCSVRecord r (Cons k v tailrl) where
  writeCSVRecord r = let
    val = writeCSV $ Record.get (Proxy @k) r
    tail = writeCSVRecord @tail @tailrl $ Record.delete (Proxy @k) r
  in
    [val] <> tail

instance WriteCSVRecord () Nil where
  writeCSVRecord _ = []

class ReadCSVRecord :: Row Type -> RowList Type -> Constraint
class RowToList r rl <= ReadCSVRecord r rl | rl -> r where
  readCSVRecord :: Array String -> Except (NonEmptyList ForeignError) { | r }

instance (RowToList r (Cons k v tailrl), IsSymbol k, ReadCSV v, Lacks k tail, Cons k v tail r, ReadCSVRecord tail tailrl) => ReadCSVRecord r (Cons k v tailrl) where
  readCSVRecord vals = do
    valraw <- liftMaybe (pure $ ForeignError "unexpected end of record") $ Array.head vals
    val <- readCSV @v valraw
    tail <- readCSVRecord @tail @tailrl (fromMaybe [] $ Array.tail vals)
    pure $ Record.insert (Proxy @k) val tail

instance ReadCSVRecord () Nil where
  readCSVRecord _ = pure {}
