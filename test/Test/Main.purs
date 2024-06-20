module Test.Main where

import Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Effect.Console as Console
import Node.EventEmitter as Event
import Node.Process as Process
import Test.Pipes.CSV as Test.Pipes.CSV
import Test.Spec.Reporter (specReporter)
import Test.Spec.Runner (defaultConfig, runSpec')

main :: Effect Unit
main = launchAff_ do
  void $ liftEffect $ Event.on Process.uncaughtExceptionH (const $ Console.error) Process.process
  runSpec' (defaultConfig { failFast = true, timeout = Nothing }) [ specReporter ] do
    Test.Pipes.CSV.spec
