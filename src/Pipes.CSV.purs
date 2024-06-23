module Pipes.CSV where

import Prelude

import Control.Monad.Error.Class (liftEither)
import Control.Monad.Except (runExcept)
import Control.Monad.ST.Global (Global)
import Control.Monad.ST.Global as ST
import Control.Monad.ST.Ref (STRef)
import Control.Monad.ST.Ref as STRef
import Data.Array as Array
import Data.Bifunctor (lmap)
import Data.CSV.Record (class ReadCSVRecord, class WriteCSVRecord, readCSVRecord, writeCSVRecord)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Profunctor as Pro
import Data.Tuple.Nested ((/\))
import Effect.Aff (Aff)
import Effect.Class (liftEffect)
import Effect.Exception (error)
import Node.Buffer (Buffer)
import Node.Stream.CSV.Parse as CSV.Parse
import Node.Stream.CSV.Stringify as CSV.Stringify
import Pipes.Async (AsyncPipe(..), ReadResult(..))
import Pipes.Node.Stream (TransformContext)
import Pipes.Node.Stream as Pipes.Stream
import Prim.RowList (class RowToList)
import Record.Extra (class Keys, keys)
import Type.Prelude (Proxy(..))

type ParseContext =
  { colsST :: STRef Global (Maybe (Map String Int))
  , t :: TransformContext Buffer (Array String)
  }

-- | Transforms buffer chunks of a CSV file to parsed
-- | records of `r`.
parse
  :: forall @r rl
  . RowToList r rl
  => ReadCSVRecord r rl
  => AsyncPipe ParseContext Aff (Maybe Buffer) (Maybe { | r })
parse =
  let
    readCols st = liftEffect $ ST.toEffect $ STRef.read st
    putCols st a = void $ liftEffect $ ST.toEffect $ STRef.write (Just a) st

    firstRow st a = putCols st $ Map.fromFoldable $ mapWithIndex (flip (/\)) a
    row a cols' = liftEither $ lmap (error <<< show) $ runExcept $ readCSVRecord @r @rl cols' a

    (AsyncPipe init' write' awaitWrite' read' awaitRead') =
      Pipes.Stream.fromTransform $ CSV.Parse.toObjectStream <$> CSV.Parse.make {}

    init = do
      t <- init'
      colsST <- liftEffect $ ST.toEffect $ STRef.new Nothing
      pure {t, colsST}

    write {t} a = write' t a
    awaitWrite {t} = awaitWrite' t
    awaitRead {t} = awaitRead' t

    read {colsST, t} = do
      r <- read' t
      case r of
        ReadWouldBlock -> pure ReadWouldBlock
        ReadOk Nothing -> pure $ ReadOk Nothing
        ReadOk (Just r') -> do
          cols <- readCols colsST
          case cols of
            Just cols' -> ReadOk <$> Just <$> row r' cols'
            Nothing -> firstRow colsST r' *> read {colsST, t}
  in
    AsyncPipe
      init
      write
      awaitWrite
      read
      awaitRead

-- | Transforms buffer chunks of a CSV file to parsed
-- | arrays of CSV values.
parseRaw :: AsyncPipe (TransformContext Buffer (Array String)) Aff (Maybe Buffer) (Maybe (Array String))
parseRaw = do
  Pipes.Stream.fromTransform $ CSV.Parse.toObjectStream <$> CSV.Parse.make {}

-- | Transforms CSV rows into stringified CSV records
-- | using the given ordered array of column names.
stringifyRaw :: Array String -> AsyncPipe (TransformContext (Array String) String) Aff (Maybe (Array String)) (Maybe String)
stringifyRaw columns =
  Pipes.Stream.fromTransform $ CSV.Stringify.toObjectStream <$> CSV.Stringify.make columns {}

-- | Transforms purescript records into stringified CSV records.
-- |
-- | Columns are inferred from the record's keys, ordered alphabetically.
stringify :: forall r rl. WriteCSVRecord r rl => RowToList r rl => Keys rl => AsyncPipe (TransformContext (Array String) String) Aff (Maybe { | r }) (Maybe String)
stringify = do
  let
    p = Pipes.Stream.fromTransform $ CSV.Stringify.toObjectStream <$> CSV.Stringify.make (Array.fromFoldable $ keys $ Proxy @r) {}
  Pro.lcmap (map $ writeCSVRecord @r @rl) p
