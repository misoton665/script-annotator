module Components.App.Annotator exposing (..)

import Components.App.Model exposing (AnnotatorId)
import Components.App.Msg exposing (Msg)
import Html exposing (Html, div, span, text)
import Html.Attributes exposing (style)
import List.Extra as ListEx


type alias Annotator =
    { id : AnnotatorId
    , name : String
    , hintHtml : Html Msg
    }


defaultAnnotator : Annotator
defaultAnnotator =
    { id = "default"
    , name = ""
    , hintHtml = text "default"
    }


find : AnnotatorId -> List Annotator -> Annotator
find id =
    Maybe.withDefault defaultAnnotator << ListEx.find (\a -> a.id == id)
