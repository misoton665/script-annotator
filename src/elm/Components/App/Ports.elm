port module Components.App.Ports exposing (..)

import Components.App.Msg exposing (Msg(AppliedAnnotation))


subscriptions : Sub Msg
subscriptions =
    Sub.batch
        [ appliedAnnotation AppliedAnnotation
        ]


port applyAnnotation : Int -> Cmd msg


port appliedAnnotation : (() -> msg) -> Sub msg
