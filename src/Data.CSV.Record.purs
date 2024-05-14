module Data.CSV.Record where

import Prelude

import Control.Monad.Error.Class (liftMaybe)
import Control.Monad.Except (Except)
import Data.Array as Array
import Data.CSV (class ReadCSV, class WriteCSV, readCSV, writeCSV)
import Data.List.NonEmpty (NonEmptyList)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (fromMaybe)
import Data.Symbol (class IsSymbol, reflectSymbol)
import Foreign (ForeignError(..))
import Prim.Row (class Cons, class Lacks)
import Prim.RowList (class RowToList, Cons, Nil, RowList)
import Record as Record
import Type.Prelude (Proxy(..))

class WriteCSVRecord :: Row Type -> RowList Type -> Constraint
class RowToList r rl <= WriteCSVRecord r rl | rl -> r where
  writeCSVRecord :: { | r } -> Array String

instance (RowToList r (Cons k v tailrl), IsSymbol k, WriteCSV v, Lacks k tail, Cons k v tail r, WriteCSVRecord tail tailrl) => WriteCSVRecord r (Cons k v tailrl) where
  writeCSVRecord r =
    let
      val = writeCSV $ Record.get (Proxy @k) r
      tail = writeCSVRecord @tail @tailrl $ Record.delete (Proxy @k) r
    in
      [ val ] <> tail

instance WriteCSVRecord () Nil where
  writeCSVRecord _ = []

class ReadCSVRecord :: Row Type -> RowList Type -> Constraint
class RowToList r rl <= ReadCSVRecord r rl | rl -> r where
  readCSVRecord :: Map String Int -> Array String -> Except (NonEmptyList ForeignError) { | r }

instance (RowToList r (Cons k v tailrl), IsSymbol k, ReadCSV v, Lacks k tail, Cons k v tail r, ReadCSVRecord tail tailrl) => ReadCSVRecord r (Cons k v tailrl) where
  readCSVRecord cols vals = do
    let
      k = reflectSymbol (Proxy @k)
    pos <- liftMaybe (pure $ ForeignError $ "reached end of row looking for column " <> k) $ Map.lookup k cols
    let valraw = fromMaybe "" $ Array.index vals pos
    val <- readCSV @v valraw
    tail <- readCSVRecord @tail @tailrl cols vals
    pure $ Record.insert (Proxy @k) val tail

instance ReadCSVRecord () Nil where
  readCSVRecord _ _ = pure {}
