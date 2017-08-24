module Components.App.Update exposing (..)

import Components.App.Annotator as Annotator exposing (AnnotatorId)
import Components.App.Model exposing (Model, isEnabledAnnotatorId)
import Components.App.Msg exposing (..)
import Components.App.Ports exposing (applyAnnotation, applyMultiAnnotations)
import List.Extra as ListEx


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        ApplyAnnotation id ->
            let
                updatedIds =
                    toggleAnnotator id model
            in
                { model | enabledAnnotatorIds = updatedIds } ! [ applyMultiAnnotations updatedIds ] --!  [ applyAnnotation id ]

        ApplyMultiAnnotations ->
            model ! [ applyMultiAnnotations model.enabledAnnotatorIds ]

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
