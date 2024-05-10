module Test.Pipes.CSV where

import Prelude

import Control.Monad.Gen (chooseInt)
import Control.Monad.Rec.Class (Step(..), tailRecM)
import Data.Array as Array
import Data.DateTime (DateTime)
import Data.Foldable (fold)
import Data.Maybe (Maybe(..), fromJust)
import Data.Newtype (wrap)
import Data.PreciseDateTime (fromRFC3339String, toDateTimeLossy)
import Effect.Class (liftEffect)
import Node.Encoding (Encoding(..))
import Partial.Unsafe (unsafePartial)
import Pipes (yield, (>->))
import Pipes (each) as Pipes
import Pipes.CSV as Pipes.CSV
import Pipes.Collect as Pipes.Collect
import Pipes.Node.Buffer as Pipes.Buffer
import Pipes.Node.Stream as Pipes.Stream
import Pipes.Prelude (map, toListM) as Pipes
import Pipes.Util as Pipes.Util
import Test.QuickCheck.Gen (randomSample')
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual)

csv :: String
csv = """created,flag,foo,id
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
          [ {id: 1, foo: "a", flag: true, created: dt "2020-01-01T00:00:00Z"}
          , {id: 2, foo: "apple", flag: false, created: dt "2024-02-02T08:00:00Z"}
          , {id: 3, foo: "hello", flag: true, created: dt "1970-01-01T00:00:00Z"}
          ]

      csv' <- map fold $ Pipes.Collect.collectArray $ Pipes.Stream.withEOS (Pipes.each objs) >-> Pipes.CSV.stringify >-> Pipes.Stream.unEOS
      csv' `shouldEqual` csv
    describe "parse" do
      it "parses csv" do
        rows <- map Array.fromFoldable
          $ Pipes.toListM
          $ Pipes.Stream.withEOS (yield csv)
            >-> Pipes.Stream.inEOS (Pipes.Buffer.fromString UTF8)
            >-> Pipes.CSV.parse
            >-> Pipes.Stream.unEOS

        rows `shouldEqual`
          [ {id: 1, foo: "a", flag: true, created: dt "2020-01-01T00:00:00Z"}
          , {id: 2, foo: "apple", flag: false, created: dt "2024-02-02T08:00:00Z"}
          , {id: 3, foo: "hello", flag: true, created: dt "1970-01-01T00:00:00Z"}
          ]
      it "parses large csv" do
        nums <- liftEffect $ randomSample' 100000 (chooseInt 0 9)
        let
          csvRows = ["id\n"] <> ((_ <> "\n") <$> show <$> nums)
          csv' =
            let
              go ix
                | Just a <- Array.index csvRows ix = yield a $> Loop (ix + 1)
                | otherwise = pure $ Done unit
            in
              tailRecM go 0
          in16kbChunks =
            Pipes.Util.chunked 16000
            >-> Pipes.Stream.inEOS (Pipes.map fold)
            >-> Pipes.Stream.inEOS (Pipes.Buffer.fromString UTF8)

        rows <-
          Pipes.Collect.collectArray
          $ Pipes.Stream.withEOS csv'
            >-> in16kbChunks
            >-> Pipes.CSV.parse
            >-> Pipes.Stream.unEOS

        rows `shouldEqual` ((\id -> {id}) <$> nums)
