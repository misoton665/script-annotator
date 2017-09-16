module Components.App.Msg exposing (..)

import Components.App.Model exposing (AnnotatorId)


type Msg
    = ApplyAnnotation AnnotatorId
    | AppliedAnnotation ()
    | ApplyMultiAnnotations
    | AppliedMultiAnnotations ()
    | SpeakInputText
    | NoOp
