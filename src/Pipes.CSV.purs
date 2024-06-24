module Pipes.CSV where

import Prelude

import Control.Monad.Cont (lift)
import Control.Monad.Error.Class (liftEither, liftMaybe)
import Control.Monad.Except (runExcept)
import Control.Monad.ST.Global as ST
import Control.Monad.ST.Ref as STRef
import Data.Array as Array
import Data.Bifunctor (lmap)
import Data.CSV.Record (class ReadCSVRecord, class WriteCSVRecord, readCSVRecord, writeCSVRecord)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Tuple.Nested ((/\))
import Effect.Aff (Aff)
import Effect.Class (liftEffect)
import Effect.Exception (error)
import Node.Buffer (Buffer)
import Node.Stream.CSV.Parse as CSV.Parse
import Node.Stream.CSV.Stringify as CSV.Stringify
import Pipes.Async (AsyncPipe(..), ReadResult(..), getAsyncIO, mapIO, stripIO)
import Pipes.Node.Stream as Pipes.Stream
import Prim.RowList (class RowToList)
import Record.Extra (class Keys, keys)
import Type.Prelude (Proxy(..))

-- | Transforms buffer chunks of a CSV file to parsed
-- | records of `r`.
parse
  :: forall @r rl
  . RowToList r rl
  => ReadCSVRecord r rl
  => AsyncPipe (Maybe Buffer) (Maybe { | r }) Aff Unit
parse =
  let
    readCols st = liftEffect $ ST.toEffect $ STRef.read st
    putCols st a = void $ liftEffect $ ST.toEffect $ STRef.write (Just a) st

    firstRow st a = putCols st $ Map.fromFoldable $ mapWithIndex (flip (/\)) a
    row a cols' = liftEither $ lmap (error <<< show) $ runExcept $ readCSVRecord @r @rl cols' a
  in do
    colsST <- liftEffect $ ST.toEffect $ STRef.new Nothing

    let
      decoder = Pipes.Stream.fromTransformEffect $ CSV.Parse.toObjectStream <$> CSV.Parse.make {}

    {write, read: read', awaitRead, awaitWrite} /\ done <- liftMaybe (error "unreachable") =<< lift (getAsyncIO decoder)
    let
      read =
        read' >>= case _ of
          ReadWouldBlock -> pure ReadWouldBlock
          ReadOk Nothing -> pure $ ReadOk Nothing
          ReadOk (Just r') -> do
            cols <- readCols colsST
            case cols of
              Just cols' -> ReadOk <$> Just <$> row r' cols'
              Nothing -> firstRow colsST r' *> read

    AsyncIO $ {write, read, awaitWrite, awaitRead} /\ lift (stripIO done)

-- | Transforms buffer chunks of a CSV file to parsed
-- | arrays of CSV values.
parseRaw :: AsyncPipe (Maybe Buffer) (Maybe (Array String)) Aff Unit
parseRaw =
  Pipes.Stream.fromTransformEffect $ CSV.Parse.toObjectStream <$> CSV.Parse.make {}

-- | Transforms CSV rows into stringified CSV records
-- | using the given ordered array of column names.
stringifyRaw :: Array String -> AsyncPipe (Maybe (Array String)) (Maybe String) Aff Unit
stringifyRaw columns =
  Pipes.Stream.fromTransformEffect $ CSV.Stringify.toObjectStream <$> CSV.Stringify.make columns {}

-- | Transforms purescript records into stringified CSV records.
-- |
-- | Columns are inferred from the record's keys, ordered alphabetically.
stringify :: forall r rl. WriteCSVRecord r rl => RowToList r rl => Keys rl => AsyncPipe (Maybe { | r }) (Maybe String) Aff Unit
stringify = do
  let
    p = Pipes.Stream.fromTransformEffect $ CSV.Stringify.toObjectStream <$> CSV.Stringify.make (Array.fromFoldable $ keys $ Proxy @r) {}
  mapIO (map $ writeCSVRecord @r @rl) identity p
