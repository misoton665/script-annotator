module Components.App.AnnotatorToggleView exposing (..)

import Components.App.Annotator exposing (Annotator)
import Components.App.Model exposing (Model, isEnabledAnnotatorId)
import Components.App.Msg exposing (Msg(ApplyAnnotation))
import Html exposing (Html, button, span, text)
import Html.Attributes exposing (class, style)
import Html.Events exposing (onClick)


annotatorToggle : Annotator -> Model -> Html Msg
annotatorToggle annotator model =
    let
        toggleCls =
            if isEnabledAnnotatorId annotator.id model then
                "annotator-toggle-on"
            else
                "annotator-toggle-off"
    in
    button [ class <| "annotator-toggle " ++ toggleCls, onClick <| ApplyAnnotation annotator.id ] [ text annotator.name ]
