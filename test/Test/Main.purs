module Test.Main where

import Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff (launchAff_)
import Test.Node.Stream.Object as Test.Node.Stream.Object
import Test.Spec.Reporter (consoleReporter, specReporter)
import Test.Spec.Runner (defaultConfig, runSpec')

main :: Effect Unit
main = launchAff_ $ runSpec' (defaultConfig { timeout = Nothing }) [ consoleReporter ] do
  Test.Node.Stream.Object.spec
