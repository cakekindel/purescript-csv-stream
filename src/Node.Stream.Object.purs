module Node.Stream.Object where

import Prelude

import Control.Monad.Rec.Class (untilJust)
import Control.Monad.ST.Global as ST
import Control.Monad.ST.Ref as STRef
import Control.Promise (Promise)
import Control.Promise as Promise
import Data.Array as Array
import Data.Array.ST as Array.ST
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype, unwrap, wrap)
import Data.Profunctor (class Profunctor)
import Data.Traversable (class Traversable, traverse)
import Effect (Effect)
import Effect.Aff (Aff, delay, effectCanceler, launchAff_, makeAff)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Exception (Error)
import Effect.Uncurried (mkEffectFn1)
import Node.Buffer (Buffer)
import Node.EventEmitter (EventHandle(..))
import Node.EventEmitter as Event
import Node.EventEmitter.UtilTypes (EventHandle1, EventHandle0)
import Node.Stream (Readable, Writable)
import Unsafe.Coerce (unsafeCoerce)

foreign import data Stream :: Type -> Type -> Type

newtype ObjectStream :: Type -> Type -> Type
newtype ObjectStream i o = ObjectStream (Effect (Stream i o))

derive instance Newtype (ObjectStream i o) _

instance Functor (ObjectStream i) where
  map :: forall a b. (a -> b) -> ObjectStream i a -> ObjectStream i b
  map ab (ObjectStream ia) = wrap $ join $ pure pipeImpl <*> ia <*> mapImpl ab

instance Apply (ObjectStream i) where
  apply :: forall a b. ObjectStream i (a -> b) -> ObjectStream i a -> ObjectStream i b
  apply (ObjectStream iab) (ObjectStream ia) = wrap $ join $ pure applyImpl <*> iab <*> ia

instance Applicative (ObjectStream i) where
  pure = wrap <<< constImpl

instance Monad (ObjectStream i)

instance MonadEffect (ObjectStream Unit) where
  liftEffect = wrap <<< flip bind onceImpl

instance MonadAff (ObjectStream Unit) where
  liftAff = wrap <<< fromPromiseImpl <<< Promise.fromAff

instance Bind (ObjectStream i) where
  bind (ObjectStream sia') asb = wrap do
    sia <- sia'
    sab <- bindImpl (unwrap <<< asb)
    pipeImpl sia sab

instance Profunctor ObjectStream where
  dimap ab cd (ObjectStream sbc') = wrap do
    sbc <- sbc'
    sab <- mapImpl ab
    scd <- mapImpl cd
    sac <- pipeImpl sab sbc
    pipeImpl sac scd

-- | A stream that will emit the value `a` exactly once.
once :: forall a. a -> ObjectStream Unit a
once = wrap <<< onceImpl

-- | A stream that will immediately emit `close` and `end` events.
never :: forall a. ObjectStream Unit a
never = wrap neverImpl

-- | A stream that for all input chunks, emits `unit`.
sink :: forall a. ObjectStream a Unit
sink = pure unit

-- | Create a stream from a `Foldable` of `a`s
fromFoldable :: forall f a. Traversable f => f a -> ObjectStream Unit a
fromFoldable = chainMany <<< map once

-- | Convert a `Readable` stream emitting `Buffer` chunks to an `ObjectStream`
fromBufferReadable :: forall r. Readable r -> ObjectStream Unit Buffer
fromBufferReadable r = wrap $ pure $ (unsafeCoerce :: Readable r -> Stream Unit Buffer) r

-- | Convert a `Readable` stream emitting `String` chunks to an `ObjectStream`
fromStringReadable :: forall r. Readable r -> ObjectStream Unit String
fromStringReadable r = wrap $ pure $ (unsafeCoerce :: Readable r -> Stream Unit String) r

-- | Convert a `Writable` stream accepting `Buffer` chunks to an `ObjectStream`
fromBufferWritable :: forall r. Writable r -> ObjectStream Buffer Unit
fromBufferWritable r = wrap $ pure $ (unsafeCoerce :: Writable r -> Stream Buffer Unit) r

-- | Convert a `Writable` stream accepting `String` chunks to an `ObjectStream`
fromStringWritable :: forall r. Writable r -> ObjectStream String Unit
fromStringWritable r = wrap $ pure $ (unsafeCoerce :: Writable r -> Stream String Unit) r

-- | Emit chunks from the first stream, then when exhausted emit chunks from the second.
chain :: forall a. ObjectStream Unit a -> ObjectStream Unit a -> ObjectStream Unit a
chain a b = chainMany [ a, b ]

-- | `chain` for an arbitrary number of streams.
chainMany :: forall f a. Traversable f => f (ObjectStream Unit a) -> ObjectStream Unit a
chainMany as' = wrap do
  as <- Array.fromFoldable <$> traverse unwrap as'
  chainImpl as

run_ :: forall a. ObjectStream Unit a -> Aff Unit
run_ = void <<< run

run :: forall a. ObjectStream Unit a -> Aff (Array a)
run (ObjectStream s') = do
  runningCount <- liftEffect $ ST.toEffect $ STRef.new 0
  values <- liftEffect $ ST.toEffect $ Array.ST.new
  s <- liftEffect s'
  makeAff \res ->
    let
      onData a = ST.toEffect do
        void $ STRef.modify (_ + 1) runningCount
        void $ Array.ST.push a values
        void $ STRef.modify (_ - 1) runningCount
      onError e = res $ Left e
      onEnd = launchAff_ do
        untilJust do
          delay $ wrap $ 1.0
          running <- liftEffect $ ST.toEffect $ STRef.read runningCount
          pure $ if running == 0 then Just unit else Nothing
        values' <- liftEffect $ ST.toEffect $ Array.ST.unsafeFreeze values
        liftEffect $ res $ Right values'
    in
      do
        cancelData <- Event.on dataH onData s
        cancelError <- Event.on errorH onError s
        cancelEnd <- Event.on endH onEnd s
        pure $ effectCanceler do
          cancelData
          cancelError
          cancelEnd

-- | Constructs a `Transform` stream that always invokes the callback with the provided value.
foreign import constImpl :: forall i a. a -> Effect (Stream i a)

-- | Constructs a Stream that re-emits the outputs from each stream, in order.
foreign import chainImpl :: forall a. Array (Stream Unit a) -> Effect (Stream Unit a)

-- | Pipes a stream's output into another's input, returning the new composite stream.
-- |
-- | Note that this differs from `Readable#pipe`, which returns the destination stream
-- | verbatim to allow chained piping of only _outputs_.
foreign import pipeImpl :: forall a b c. Stream a b -> Stream b c -> Effect (Stream a c)

-- | A readable stream that immediately closes without emitting any chunks.
foreign import neverImpl :: forall a. Effect (Stream Unit a)

-- | Constructs a readable stream from an asynchronous value.
foreign import fromPromiseImpl :: forall a. Effect (Promise a) -> Effect (Stream Unit a)

-- | Constructs a readable stream that emits a single value then closes.
foreign import onceImpl :: forall i a. a -> Effect (Stream i a)

-- | Constructs a `Transform` applying the given function to chunks.
foreign import mapImpl :: forall a b. (a -> b) -> Effect (Stream a b)

-- | Constructs a `Transform` zipping functions from the left stream with values from the right stream.
-- |
-- | Closes when either stream closes.
foreign import applyImpl :: forall i a b. Stream i (a -> b) -> Stream i a -> Effect (Stream i b)

-- | Constructs a `Transform` which applies a function to each written chunk.
-- |
-- | The values emitted by the stream returned by this function are then emitted
-- | until the temporary stream closes.
foreign import bindImpl :: forall a _x b. (a -> Effect (Stream _x b)) -> Effect (Stream a b)

dataH :: forall i o. EventHandle1 (Stream i o) o
dataH = EventHandle "data" mkEffectFn1

readableH :: forall i o. EventHandle0 (Stream i o)
readableH = EventHandle "readable" identity

closeH :: forall i o. EventHandle0 (Stream i o)
closeH = EventHandle "close" identity

endH :: forall i o. EventHandle0 (Stream i o)
endH = EventHandle "end" identity

errorH :: forall i o. EventHandle1 (Stream i o) Error
errorH = EventHandle "error" mkEffectFn1
