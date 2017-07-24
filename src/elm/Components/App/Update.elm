module Components.App.Update exposing (..)

import Components.App.Model exposing (Model)
import Components.App.Msg exposing (..)
import Components.App.Ports exposing (applyAnnotation)


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        ApplyAnnotation id ->
            model ! [ applyAnnotation id ]

        _ ->
            model ! []
