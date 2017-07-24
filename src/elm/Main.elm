module Main exposing (..)

-- component import example

import Components.App.Model exposing (Model, initialModel)
import Components.App.Msg exposing (Msg)
import Components.App.Ports exposing (subscriptions)
import Components.App.Update exposing (update)
import Components.App.View exposing (view)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


main : Program Never Model Msg
main =
    Html.program { init = initialModel ! [], view = view, update = update, subscriptions = \_ -> subscriptions }
