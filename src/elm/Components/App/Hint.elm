module Components.App.Hint exposing (..)

import Components.App.Msg exposing (Msg)
import Html exposing (Html, div, span, text)
import Html.Attributes exposing (class, style)


hintHtml : List ( Html Msg, String ) -> Html Msg
hintHtml props =
    div [] <| List.map partialHintHtml props


partialHintHtml : ( Html Msg, String ) -> Html Msg
partialHintHtml ( symbol, description ) =
    span [ class "hint" ]
        [ symbol
        , text description
        ]


symbolIcon : String -> String -> Html Msg
symbolIcon s color =
    span [ class "color", style [ ( "color", color ) ] ] [ text s ]


boldSymbolIcon : String -> String -> Html Msg
boldSymbolIcon s color =
    span [ class "color", style [ ( "color", color ), ( "font-weight", "bold" ) ] ] [ text s ]


colorPallet : String -> Html Msg
colorPallet =
    symbolIcon "■"
