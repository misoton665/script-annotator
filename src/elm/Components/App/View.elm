module Components.App.View exposing (..)

import Components.App.Annotator as Annotator exposing (Annotator)
import Components.App.AnnotatorToggleView exposing (annotatorToggle)
import Components.App.Constants exposing (annotators, viewPhrases)
import Components.App.Model exposing (Model)
import Components.App.Msg exposing (..)
import Html exposing (Html, button, div, h1, h2, p, text, textarea)
import Html.Attributes exposing (class, id, value)
import Html.Events exposing (onClick, onInput)


view : Model -> Html Msg
view model =
    div [ class "main-frame" ]
        [ viewPageTitle
        , viewAnnotatorButtons model
        , viewSpeakingButton
        , viewInputArea
        , viewResultArea
        , viewAnnotationHints model
        ]


viewPageTitle : Html Msg
viewPageTitle =
    h2 [ class "page-title" ]
        [ text viewPhrases.pageTitle
        ]


viewAnnotatorButtons : Model -> Html Msg
viewAnnotatorButtons model =
    div [ class "annotator-buttons" ] <|
        List.map (flip annotatorToggle <| model) annotators


viewSpeakingButton : Html Msg
viewSpeakingButton =
    button [ onClick SpeakInputText ] [ text "Speak" ]


viewInputArea : Html Msg
viewInputArea =
    div [ class "input-area" ]
        [ textarea [ id "input", value "", onInput (\_ -> ApplyMultiAnnotations) ] []
        ]


viewResultArea : Html Msg
viewResultArea =
    div [ class "result-area" ]
        [ p [ id "result" ] []
        ]


viewAnnotationHints : Model -> Html Msg
viewAnnotationHints model =
    let
        annotatorHints =
            model.enabledAnnotatorIds
                |> List.map (.hintHtml << flip Annotator.find annotators)
                |> List.reverse
    in
    div [ class "annotation-hints" ] annotatorHints


viewButtonHistory : Model -> Html Msg
viewButtonHistory model =
    div [] []
