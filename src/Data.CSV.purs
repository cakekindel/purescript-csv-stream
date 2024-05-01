module Data.CSV where

import Prelude

import Control.Monad.Error.Class (liftMaybe, throwError)
import Control.Monad.Except (Except)
import Data.DateTime (DateTime)
import Data.Int as Int
import Data.List.NonEmpty (NonEmptyList)
import Data.Maybe (Maybe(..), maybe)
import Data.Newtype (unwrap)
import Data.Number (fromString) as Number
import Data.Number.Format (toString) as Number
import Data.PreciseDateTime (fromDateTime, fromRFC3339String, toDateTimeLossy, toRFC3339String)
import Data.RFC3339String (RFC3339String(..))
import Data.String as String
import Foreign (ForeignError(..))

class ReadCSV a where
  readCSV :: String -> Except (NonEmptyList ForeignError) a

class WriteCSV a where
  writeCSV :: a -> String

instance ReadCSV Int where
  readCSV s = liftMaybe (pure $ ForeignError $ "invalid integer: " <> s) $ Int.fromString s

instance ReadCSV Number where
  readCSV s = liftMaybe (pure $ ForeignError $ "invalid number: " <> s) $ Number.fromString s

instance ReadCSV String where
  readCSV = pure

instance ReadCSV DateTime where
  readCSV s = map toDateTimeLossy $ liftMaybe (pure $ ForeignError $ "invalid ISO date string: " <> s) $ fromRFC3339String $ RFC3339String s

instance ReadCSV Boolean where
  readCSV s =
    let
      inner "t" = pure true
      inner "true" = pure true
      inner "yes" = pure true
      inner "y" = pure true
      inner "1" = pure true
      inner "f" = pure false
      inner "false" = pure false
      inner "no" = pure false
      inner "n" = pure false
      inner "0" = pure false
      inner _ = throwError $ pure $ ForeignError $ "invalid boolean value: " <> s
    in
      inner $ String.toLower s

instance ReadCSV a => ReadCSV (Maybe a) where
  readCSV "" = pure Nothing
  readCSV s = Just <$> readCSV s

instance WriteCSV Int where
  writeCSV = Int.toStringAs Int.decimal

instance WriteCSV Number where
  writeCSV = Number.toString

instance WriteCSV String where
  writeCSV = identity

instance WriteCSV DateTime where
  writeCSV = unwrap <<< toRFC3339String <<< fromDateTime

instance WriteCSV Boolean where
  writeCSV = show

instance WriteCSV a => WriteCSV (Maybe a) where
  writeCSV = maybe "" writeCSV
