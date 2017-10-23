module Components.App.Msg exposing (..)

import Components.App.Model exposing (AnnotatorId)


type Msg
    = ApplyAnnotation AnnotatorId
    | AnnotateRhythm String
    | AppliedAnnotation ()
    | ApplyMultiAnnotations
    | AppliedMultiAnnotations ()
    | SpeakInputText
    | NoOp
