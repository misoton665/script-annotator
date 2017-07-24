module Components.App.View exposing (..)

import Components.App.AnnotatorToggleView exposing (annotatorToggle)
import Components.App.Constants exposing (annotators, viewPhrases)
import Components.App.Model exposing (Model)
import Components.App.Msg exposing (Msg(ApplyAnnotation))
import Html exposing (Html, button, div, h1, h2, p, text, textarea)
import Html.Attributes exposing (class, id, value)
import Html.Events exposing (onClick)


view : Model -> Html Msg
view model =
    div []
        [ viewPageTitle
        , viewAnnotatorButtons model
        , viewInputArea
        , viewResultArea
        ]


viewPageTitle : Html Msg
viewPageTitle =
    h2 [ class "pageTitle" ] [ text viewPhrases.pageTitle ]


viewAnnotatorButtons : Model -> Html Msg
viewAnnotatorButtons model =
    div [ class "annotatorButtons" ]
        [ annotatorToggle annotators.sample model
        , annotatorToggle annotators.soundTh model
        ]


viewInputArea : Html Msg
viewInputArea =
    div [ class "inputArea" ]
        [ textarea [ id "input", value "" ] []
        ]


viewResultArea : Html Msg
viewResultArea =
    div [ class "resultArea" ]
        [ p [ id "result" ] []
        ]
