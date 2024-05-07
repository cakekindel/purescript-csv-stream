module Test.Node.Stream.Object where

import Prelude

import Data.Newtype (wrap)
import Effect.Aff (delay)
import Effect.Aff.Class (liftAff)
import Node.Stream.Object as Stream
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (shouldEqual)

spec :: Spec Unit
spec =
  describe "Node.Stream.Object" do
    describe "ObjectStream" do
      describe "once" do
        it "emits once" do
          out <- Stream.run (Stream.once 1)
          out `shouldEqual` [ 1 ]
      describe "never" do
        it "immediately closes" do
          out <- Stream.run Stream.never
          out `shouldEqual` ([] :: Array Int)
      describe "chain" do
        it "noops" do
          out <- Stream.run $ Stream.chainMany []
          out `shouldEqual` ([] :: Array Int)
        it "works with 1 stream" do
          out <- Stream.run $ Stream.chainMany [Stream.once 1]
          out `shouldEqual` [1]
        it "works with 2 streams" do
          out <- Stream.run $ Stream.chainMany [Stream.once 1, Stream.once 2]
          out `shouldEqual` [1, 2]
        it "does not emit end until last child stream ends" do
          let
            delayed n a = liftAff do
              delay $ wrap n
              pure a
          out <- Stream.run $ Stream.chainMany [delayed 10.0 1, delayed 20.0 2]
          out `shouldEqual` [1, 2]
      describe "fromFoldable" do
        it "creates an empty readable" do
          out <- Stream.run (Stream.fromFoldable [] :: Stream.ObjectStream Unit (Array Int))
          out `shouldEqual` []
        it "creates a readable that emits each element" do
          out <- Stream.run (Stream.fromFoldable [ 1, 2, 3 ])
          out `shouldEqual` [ 1, 2, 3 ]
        it "bind maps each number" do
          out <- Stream.run do
            a <- Stream.fromFoldable [ 1, 2, 3 ]
            pure $ a + 1
          out `shouldEqual` [ 2, 3, 4 ]
        it "bind fans out" do
          out <- Stream.run do
            a <- Stream.fromFoldable [ 1, 2, 3 ]
            Stream.fromFoldable [a * 10, a * 20]
          out `shouldEqual` [ 10, 20, 20, 40, 30, 60 ]
