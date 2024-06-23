module Test.Pipes.CSV where

import Prelude

import Control.Monad.Gen (chooseInt)
import Control.Monad.Rec.Class (Step(..), tailRecM)
import Data.Array as Array
import Data.DateTime (DateTime)
import Data.Foldable (fold, sum)
import Data.Maybe (Maybe(..), fromJust)
import Data.Newtype (wrap)
import Data.PreciseDateTime (fromRFC3339String, toDateTimeLossy)
import Data.String.CodePoints as String.CodePoints
import Data.Tuple.Nested ((/\))
import Effect.Class (liftEffect)
import Effect.Console (log)
import Node.Encoding (Encoding(..))
import Partial.Unsafe (unsafePartial)
import Pipes (yield, (>->))
import Pipes.Async ((>-/->))
import Pipes.CSV as Pipes.CSV
import Pipes.Collect as Pipes.Collect
import Pipes.Construct as Pipes.Construct
import Pipes.Node.Buffer as Pipes.Buffer
import Pipes.Node.Stream as Pipes.Stream
import Pipes.Prelude (chain, map, toListM) as Pipes
import Pipes.Util as Pipes.Util
import Test.QuickCheck.Gen (randomSample')
import Test.Spec (Spec, before, describe, it)
import Test.Spec.Assertions (shouldEqual)

csv :: String
csv =
  """created,flag,foo,id
2020-01-01T00:00:00.0Z,true,a,1
2024-02-02T08:00:00.0Z,false,apple,2
1970-01-01T00:00:00.0Z,true,hello,3
"""

dt :: String -> DateTime
dt = toDateTimeLossy <<< unsafePartial fromJust <<< fromRFC3339String <<< wrap

spec :: Spec Unit
spec =
  describe "Pipes.CSV" do
    it "stringify" do
      let
        objs =
          [ { id: 1, foo: "a", flag: true, created: dt "2020-01-01T00:00:00Z" }
          , { id: 2, foo: "apple", flag: false, created: dt "2024-02-02T08:00:00Z" }
          , { id: 3, foo: "hello", flag: true, created: dt "1970-01-01T00:00:00Z" }
          ]

      csv' <- map fold $ Pipes.Collect.toArray $ Pipes.Stream.withEOS (Pipes.Construct.eachArray objs) >-/-> Pipes.CSV.stringify >-> Pipes.Stream.unEOS
      csv' `shouldEqual` csv
    describe "parse" do
      it "parses csv" do
        rows <- map Array.fromFoldable
          $ Pipes.toListM
          $ Pipes.Stream.withEOS (yield csv)
              >-> Pipes.Stream.inEOS (Pipes.Buffer.fromString UTF8)
              >-/-> Pipes.CSV.parse
              >-> Pipes.Stream.unEOS

        rows `shouldEqual`
          [ { id: 1, foo: "a", flag: true, created: dt "2020-01-01T00:00:00Z" }
          , { id: 2, foo: "apple", flag: false, created: dt "2024-02-02T08:00:00Z" }
          , { id: 3, foo: "hello", flag: true, created: dt "1970-01-01T00:00:00Z" }
          ]
      before
        (do
          nums <- liftEffect $ randomSample' 100000 (chooseInt 0 9)
          let
            chars = [ "i","d","\n" ] <> join ((\n -> [show n, "\n"]) <$> nums)
          bufs <- Pipes.Collect.toArray
            $ Pipes.Stream.withEOS (Pipes.Construct.eachArray chars)
             >-> Pipes.Util.chunked 1000
             >-> Pipes.Stream.inEOS (Pipes.map fold >-> Pipes.Buffer.fromString UTF8)
             >-> Pipes.Stream.unEOS
          pure $ nums /\ bufs
        )
        $ it "parses large csv" \(nums /\ bufs) -> do
          rows <-
            Pipes.Collect.toArray
              $ Pipes.Stream.withEOS (Pipes.Construct.eachArray bufs)
                  >-/-> Pipes.CSV.parse @(id :: Int)
                  >-> Pipes.Stream.unEOS

          rows `shouldEqual` ((\id -> { id }) <$> nums)
