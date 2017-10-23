port module Components.App.Ports exposing (..)

import Components.App.Model exposing (AnnotatorId)
import Components.App.Msg exposing (Msg(AnnotateRhythm, AppliedAnnotation, AppliedMultiAnnotations))


subscriptions : Sub Msg
subscriptions =
    Sub.batch
        [ annotateRhythm AnnotateRhythm
        , appliedAnnotation AppliedAnnotation
        , appliedMultiAnnotations AppliedMultiAnnotations
        ]


port annotateRhythm : (String -> msg) -> Sub msg


port onAnnotated : String -> Cmd msg


port applyAnnotation : AnnotatorId -> Cmd msg


port appliedAnnotation : (() -> msg) -> Sub msg


port applyMultiAnnotations : List AnnotatorId -> Cmd msg


port appliedMultiAnnotations : (() -> msg) -> Sub msg


port speakInputText : () -> Cmd msg
