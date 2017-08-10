module Components.App.Constants exposing (..)


type alias AnnotatorId =
    String


type Annotator
    = Annotator AnnotatorId String


annotators : List Annotator
annotators =
    [ Annotator "sample" "Sample"
    , Annotator "soundth" "Sound \"th\""
    , Annotator "sounded" "Sound \"ed\""
    , Annotator "link2" "Link 2"
    , Annotator "contentword" "ContentWord"
    , Annotator "intonationfinal" "Intonation-final"
    , Annotator "pausing" "Pausing"
    , Annotator "sounds" "Sound \"s\""
    ]


type alias ViewPhrases =
    { pageTitle : String
    }


viewPhrases : ViewPhrases
viewPhrases =
    { pageTitle = "Script annotator (2017 E317 patterns and language)"
    }
