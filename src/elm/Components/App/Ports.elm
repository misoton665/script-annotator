port module Components.App.Ports exposing (..)

import Components.App.Model exposing (AnnotatorId)
import Components.App.Msg exposing (Msg(AppliedAnnotation, AppliedMultiAnnotations))


subscriptions : Sub Msg
subscriptions =
    Sub.batch
        [ appliedAnnotation AppliedAnnotation
        , appliedMultiAnnotations AppliedMultiAnnotations
        ]


port applyAnnotation : AnnotatorId -> Cmd msg


port appliedAnnotation : (() -> msg) -> Sub msg


port applyMultiAnnotations : List AnnotatorId -> Cmd msg


port appliedMultiAnnotations : (() -> msg) -> Sub msg


port speakInputText : () -> Cmd msg
