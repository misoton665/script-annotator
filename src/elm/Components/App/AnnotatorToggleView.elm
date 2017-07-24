module Components.App.AnnotatorToggleView exposing (..)

import Components.App.Constants exposing (Annotator(..))
import Components.App.Model exposing (Model)
import Components.App.Msg exposing (Msg(ApplyAnnotation))
import Html exposing (Html, button, text)
import Html.Events exposing (onClick)


annotatorToggle : Annotator -> Model -> Html Msg
annotatorToggle (Annotator id name) model =
    button [ onClick <| ApplyAnnotation id ] [ text name ]
