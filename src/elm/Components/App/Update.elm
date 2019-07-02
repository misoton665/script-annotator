module Components.App.Update exposing (toggleAnnotator, update)

import Components.App.Annotator as Annotator
import Components.App.Constants exposing (annotatorIds)
import Components.App.Model exposing (AnnotatorId, Model, isEnabledAnnotatorId)
import Components.App.Msg exposing (..)
import Components.App.Ports as Ports
import Compromise.Components.Parse as Compromise
import List.Extra as ListEx


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        AnnotateRhythm text ->
            model ! [ Ports.onAnnotated <| Compromise.parseString text ]

        ApplyAnnotation id ->
            let
                updatedIds =
                    toggleAnnotator id model
            in
            { model | enabledAnnotatorIds = updatedIds } ! [ Ports.applyMultiAnnotations updatedIds ]

        ApplyMultiAnnotations ->
            model ! [ Ports.applyMultiAnnotations model.enabledAnnotatorIds ]

        SpeakInputText ->
            model ! [ Ports.speakInputText () ]

        _ ->
            model ! []


toggleAnnotator : AnnotatorId -> Model -> List AnnotatorId
toggleAnnotator id model =
    let
        isEnabled =
            isEnabledAnnotatorId id model

        beEnable =
            ListEx.unique <| id :: model.enabledAnnotatorIds

        beDisable =
            List.filter ((/=) id) model.enabledAnnotatorIds
    in
    if isEnabled then
        beDisable

    else
        beEnable
