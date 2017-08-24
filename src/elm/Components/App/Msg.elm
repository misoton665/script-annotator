module Components.App.Msg exposing (..)

import Components.App.Annotator exposing (AnnotatorId)


type Msg
    = ApplyAnnotation AnnotatorId
    | AppliedAnnotation ()
    | ApplyMultiAnnotations
    | AppliedMultiAnnotations ()
    | NoOp
