module Components.App.Msg exposing (..)

import Components.App.Constants exposing (AnnotatorId)


type Msg
    = ApplyAnnotation AnnotatorId
    | AppliedAnnotation ()
    | NoOp
