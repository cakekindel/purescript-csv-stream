module Node.Stream.CSV.Parse where

import Prelude hiding (join)

import Control.Alt ((<|>))
import Control.Alternative (guard, empty)
import Control.Monad.Error.Class (liftEither)
import Control.Monad.Except (runExcept)
import Control.Monad.Maybe.Trans (MaybeT(..), runMaybeT)
import Control.Monad.Rec.Class (class MonadRec, untilJust, whileJust)
import Control.Monad.ST.Class (liftST)
import Control.Monad.Trans.Class (lift)
import Control.MonadPlus (class Alternative)
import Control.Parallel (class Parallel, parSequence_)
import Data.Array as Array
import Data.Array.ST as Array.ST
import Data.Bifunctor (lmap)
import Data.CSV.Record (class ReadCSVRecord, readCSVRecord)
import Data.Either (Either(..))
import Data.Filterable (filter)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..), isNothing)
import Data.Newtype (wrap)
import Data.Nullable (Nullable)
import Data.Nullable as Nullable
import Data.Traversable (for)
import Effect (Effect)
import Effect as Effect
import Effect.Aff (Canceler(..), delay, makeAff)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Class (liftEffect)
import Effect.Exception (error)
import Effect.Uncurried (mkEffectFn1)
import Foreign (Foreign, unsafeToForeign)
import Foreign.Object (Object)
import Foreign.Object as Object
import Node.Encoding (Encoding(..))
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

-- | Create a CSVParser
make :: forall @r rl @config @missing @extra. RowToList r rl => ReadCSVRecord r rl => Union config missing (Config extra) => { | config } -> Effect (CSVParser r ())
make = makeImpl <<< unsafeToForeign <<< Object.union (recordToForeign { columns: false, cast: false, cast_date: false }) <<< recordToForeign

-- | Synchronously parse a CSV string
parse
  :: forall @r rl @config missing extra m p
   . Alternative p
  => Parallel p m
  => MonadAff m
  => MonadRec m
  => RowToList r rl
  => ReadCSVRecord r rl
  => Union config missing (Config extra)
  => { | config }
  -> String
  -> m (Array { | r })
parse config csv = do
  stream <- liftEffect $ make @r @config @missing @extra config
  void $ liftEffect $ Stream.writeString stream UTF8 csv
  liftEffect $ Stream.end stream
  readAll stream

-- | Loop until the stream is closed, invoking the callback with each record as it is parsed.
foreach
  :: forall @r rl x m p
   . Alternative p
  => Parallel p m
  => MonadRec m
  => MonadAff m
  => RowToList r rl
  => ReadCSVRecord r rl
  => CSVParser r x
  -> ({ | r } -> m Unit)
  -> m Unit
foreach stream cb =
  do
    q <- liftEffect $ liftST $ Array.ST.new

    let
      deque = liftEffect $ liftST $ Array.ST.shift q
      enque a = liftEffect $ liftST $ Array.ST.push a q

      waitReadable =
         makeAff \res -> do
          stop <- flip (Event.once Stream.readableH) stream $ res $ Right unit
          pure $ Canceler $ const $ liftEffect stop

      processQ =
        untilJust
          $ runMaybeT
          $ do
              liftAff $ delay $ wrap 0.0
              r <- deque
              isClosed <- liftEffect $ Stream.closed stream
              if isClosed && isNothing r then
                pure unit
              else if isNothing r then do
                liftAff $ delay $ wrap 10.0
                empty
              else do
                r' <- MaybeT $ pure r
                lift $ cb r'
                empty

      readToQ =
        whileJust
          $ runMaybeT
          $ do
              liftAff $ delay $ wrap 0.0
              guard =<< not <$> liftEffect (Stream.closed stream)
              isReadable <- liftEffect $ Stream.readable stream
              liftAff $ when (not isReadable) waitReadable

              liftEffect $ Effect.untilE do
                r <- read @r stream
                void $ for r enque
                pure $ isNothing r
              guard =<< not <$> liftEffect (Stream.closed stream)
              pure unit

    parSequence_ [readToQ, processQ]
  
-- | Reads a parsed record from the stream.
-- |
-- | Returns `Nothing` when either:
-- | - The internal buffer of parsed records has been exhausted, but there will be more (`Node.Stream.readable` and `Node.Stream.closed` are both `false`)
-- | - All records have been processed (`Node.Stream.closed` is `true`)
read
  :: forall @r rl a
   . RowToList r rl
  => ReadCSVRecord r rl
  => CSVParser r a
  -> Effect (Maybe { | r })
read stream = runMaybeT do
  cols <- MaybeT $ getOrInitColumnsMap stream
  raw :: Array String <- MaybeT $ Nullable.toMaybe <$> readImpl stream
  liftEither $ lmap (error <<< show) $ runExcept $ readCSVRecord @r @rl cols raw

-- | Collect all parsed records into an array
readAll
  :: forall @r rl a m p
   . Alternative p
  => Parallel p m
  => MonadRec m
  => MonadAff m
  => RowToList r rl
  => ReadCSVRecord r rl
  => CSVParser r a
  -> m (Array { | r })
readAll stream = do
  records <- liftEffect $ liftST $ Array.ST.new
  foreach stream $ void <<< liftEffect <<< liftST <<< flip Array.ST.push records
  liftEffect $ liftST $ Array.ST.unsafeFreeze records

-- | `data` event. Emitted when a CSV record has been parsed.
dataH :: forall r a. EventHandle1 (CSVParser r a) { | r }
dataH = EventHandle "data" mkEffectFn1

-- | FFI
foreign import makeImpl :: forall r. Foreign -> Effect (Stream r)

-- | FFI
foreign import readImpl :: forall r. Stream r -> Effect (Nullable (Array String))

-- | FFI
foreign import columnsArrayImpl :: forall r. Stream r -> Effect (Array String)

-- | FFI
foreign import columnsMapImpl :: forall r. Stream r -> Effect (Nullable (Map String Int))

-- | FFI
foreign import setColumnsMapImpl :: forall r. Stream r -> Map String Int -> Effect Unit

-- | FFI
getOrInitColumnsMap :: forall r x. CSVParser r x -> Effect (Maybe (Map String Int))
getOrInitColumnsMap s = runMaybeT do
  cols :: Array String <- MaybeT $ filter (not <<< Array.null) <$> Just <$> columnsArrayImpl s
  let
    get = MaybeT $ Nullable.toMaybe <$> columnsMapImpl s
    init = do
      let
        ixs = Array.range 0 (Array.length cols - 1)
        assoc = Array.zip cols ixs
        map = Map.fromFoldable assoc
      lift $ setColumnsMapImpl s map
      pure map
  get <|> init

-- | FFI
recordToForeign :: forall r. Record r -> Object Foreign
recordToForeign = unsafeCoerce
