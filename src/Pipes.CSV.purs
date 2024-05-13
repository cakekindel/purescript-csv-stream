module Pipes.CSV where

import Prelude

import Control.Monad.Error.Class (class MonadThrow, liftEither)
import Control.Monad.Except (runExcept)
import Control.Monad.Rec.Class (class MonadRec, forever)
import Control.Monad.ST.Global as ST
import Control.Monad.ST.Ref as STRef
import Data.Array as Array
import Data.Bifunctor (lmap)
import Data.CSV.Record (class ReadCSVRecord, class WriteCSVRecord, readCSVRecord, writeCSVRecord)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple.Nested ((/\))
import Effect.Aff.Class (class MonadAff)
import Effect.Class (liftEffect)
import Effect.Exception (Error, error)
import Node.Buffer (Buffer)
import Node.Stream.CSV.Parse as CSV.Parse
import Node.Stream.CSV.Stringify as CSV.Stringify
import Pipes (await, yield, (>->))
import Pipes.Core (Pipe)
import Pipes.Node.Stream as Pipes.Stream
import Prim.RowList (class RowToList)
import Record.Extra (class Keys, keys)
import Type.Prelude (Proxy(..))

-- | Transforms buffer chunks of a CSV file to parsed
-- | records of `r`.
-- |
-- | ```
-- | -- == my-data.csv.gz ==
-- | -- id,foo,is_deleted
-- | -- 1,hi,f
-- | -- 2,bye,t
-- |
-- | rows
-- |   :: Array {id :: Int, foo :: String, is_deleted :: Boolean}
-- |   <- map Array.fromFoldable
-- |      $ Pipes.toListM
-- |      $ Pipes.Node.Stream.unEOS
-- |      $ Pipes.Node.FS.read "my-data.csv.gz"
-- |        >-> Pipes.Node.Zlib.gunzip
-- |        >-> Pipes.CSV.parse
-- | rows `shouldEqual` [{id: 1, foo: "hi", is_deleted: false}, {id: 2, foo: "bye", is_deleted: true}]
-- | ```
parse
  :: forall @r rl m
   . MonadAff m
  => MonadThrow Error m
  => MonadRec m
  => RowToList r rl
  => ReadCSVRecord r rl
  => Pipe (Maybe Buffer) (Maybe { | r }) m Unit
parse = do
  raw <- liftEffect $ CSV.Parse.make {}
  colsST <- liftEffect $ ST.toEffect $ STRef.new Nothing

  let
    readCols = liftEffect $ ST.toEffect $ STRef.read colsST
    putCols a = void $ liftEffect $ ST.toEffect $ STRef.write (Just a) colsST

    parse' a cols' = liftEither $ lmap (error <<< show) $ runExcept $ readCSVRecord @r @rl cols' a
    firstRow a = putCols $ Map.fromFoldable $ mapWithIndex (flip (/\)) a
    row a cols' = yield =<< parse' a cols'
    unmarshal = forever do
      r <- await
      cols <- readCols
      case cols of
        Just cols' -> row r cols'
        Nothing -> firstRow r

    parser = Pipes.Stream.fromTransform $ CSV.Parse.toObjectStream raw
  parser >-> Pipes.Stream.inEOS unmarshal

-- | Transforms buffer chunks of a CSV file to parsed
-- | arrays of CSV values.
parseRaw :: forall m. MonadAff m => MonadThrow Error m => Pipe (Maybe Buffer) (Maybe (Array String)) m Unit
parseRaw = do
  s <- liftEffect $ CSV.Parse.toObjectStream <$> CSV.Parse.make {}
  Pipes.Stream.fromTransform s

-- | Transforms CSV rows into stringified CSV records
-- | using the given ordered array of column names.
stringifyRaw :: forall m. MonadAff m => MonadThrow Error m => Array String -> Pipe (Maybe (Array String)) (Maybe String) m Unit
stringifyRaw columns = do
  s <- liftEffect $ CSV.Stringify.toObjectStream <$> CSV.Stringify.make columns {}
  Pipes.Stream.fromTransform s

-- | Transforms purescript records into stringified CSV records.
-- |
-- | Columns are inferred from the record's keys, ordered alphabetically.
stringify :: forall m r rl. MonadRec m => MonadAff m => MonadThrow Error m => WriteCSVRecord r rl => RowToList r rl => Keys rl => Pipe (Maybe { | r }) (Maybe String) m Unit
stringify = do
  raw <- liftEffect $ CSV.Stringify.make (Array.fromFoldable $ keys $ Proxy @r) {}
  let
    printer = Pipes.Stream.fromTransform $ CSV.Stringify.toObjectStream raw
    marshal = forever $ yield =<< (writeCSVRecord @r @rl <$> await)
  Pipes.Stream.inEOS marshal >-> printer
