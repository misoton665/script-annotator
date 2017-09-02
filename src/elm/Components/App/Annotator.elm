module Components.App.Annotator exposing (..)

import List.Extra as ListEx


type alias AnnotatorId =
    String


type alias Annotator =
    { id : AnnotatorId
    , name : String
    }


make : AnnotatorId -> String -> Annotator
make id name =
    { id = id
    , name = name
    }


defaultAnnotator : Annotator
defaultAnnotator =
    { id = "default"
    , name = ""
    }


annotators : List Annotator
annotators =
    [ make "soundth" "Sound \"th\""
    , make "sounded" "Sound \"ed\""
    , make "link1" "Link 1"
    , make "link2" "Link 2"
    , make "contentword" "ContentWord"
    , make "intonationfinal" "Intonation-final"
    , make "pausing" "Pausing"
    , make "sounds" "Sound \"s\""
    ]


find : AnnotatorId -> List Annotator -> Annotator
find id =
    Maybe.withDefault defaultAnnotator << ListEx.find (\a -> a.id == id)
