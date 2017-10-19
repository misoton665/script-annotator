module Components.App.Constants exposing (..)

import Components.App.Annotator exposing (Annotator)
import Components.App.Hint exposing (colorPallet, hintHtml, symbolIcon)
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
    [ Annotator "soundth" "Sound \"th\"" <|
        hintHtml [ ( colorPallet "lightcoral", "/d/" ), ( colorPallet "lightcyan", "/θs/" ), ( colorPallet "lightpink", "/θ/" ) ]
    , Annotator "sounded" "Sound \"ed\"" <|
        hintHtml [ ( colorPallet "#cc99ff", "`t`" ), ( colorPallet "lightgreen", "`id`" ), ( colorPallet "lightseagreen", "`ed`" ) ]
    , Annotator "link1" "Link 1" <|
        hintHtml [ ( colorPallet "#ff0000", "Connect" ), ( colorPallet "#0000ff", "Disappear" ) ]
    , Annotator "link2" "Link 2" <|
        hintHtml [ ( colorPallet "green", "Insert /j/" ), ( colorPallet "goldenrod", "Insert /w/" ), ( colorPallet "gray", "Simple connection" ) ]
    , Annotator "contentword" "ContentWord" <|
        hintHtml [ ( symbolIcon "A↑" "#000", "Content Word" ) ]
    , Annotator "intonationfinal" "Intonation-final" <|
        hintHtml [ ( symbolIcon "⤴️" "#000", "Rise" ), ( symbolIcon "⤵️️" "#000", "Down" ) ]
    , Annotator "pausing" "Pausing" <|
        hintHtml [ ( symbolIcon "/" "#00f", "Short Pausing" ), ( symbolIcon "//" "#00f", "Middle Pausing" ), ( symbolIcon "///" "#00f", "Long Pausing" ) ]
    , Annotator "sounds" "Sound \"s\"" <|
        hintHtml [ ( colorPallet "lightsteelblue", "`s`" ), ( colorPallet "lightsalmon", "`z`" ), ( colorPallet "lightskyblue", "`iz`" ) ]
    ]


type alias ViewPhrases =
    { pageTitle : String
    }


viewPhrases : ViewPhrases
viewPhrases =
    { pageTitle = "Script annotator (2017 E317 patterns and language)"
    }
