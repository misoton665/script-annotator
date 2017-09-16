module Components.App.Constants exposing (..)

import Components.App.Annotator exposing (Annotator)
import Html exposing (text)


type alias AnnotatorIds =
    { soundth : String
    , sounded : String
    , link1 : String
    , link2 : String
    , contentword : String
    , intonationfinal : String
    , pausing : String
    , sounds : String
    }


annotatorIds : AnnotatorIds
annotatorIds =
    { soundth = "soundth"
    , sounded = "sounded"
    , link1 = "link1"
    , link2 = "link2"
    , contentword = "contentword"
    , intonationfinal = "intonationfinal"
    , pausing = "pausing"
    , sounds = "sounds"
    }


annotators : List Annotator
annotators =
    [ Annotator "soundth" "Sound \"th\"" <| text "pom"
    , Annotator "sounded" "Sound \"ed\"" <| text "pom"
    , Annotator "link1" "Link 1" <| text "pom"
    , Annotator "link2" "Link 2" <| text "pom"
    , Annotator "contentword" "ContentWord" <| text "pom"
    , Annotator "intonationfinal" "Intonation-final" <| text "pom"
    , Annotator "pausing" "Pausing" <| text "pom"
    , Annotator "sounds" "Sound \"s\"" <| text "pom"
    ]


type alias ViewPhrases =
    { pageTitle : String
    }


viewPhrases : ViewPhrases
viewPhrases =
    { pageTitle = "Script annotator (2017 E317 patterns and language)"
    }
