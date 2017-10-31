module Components.App.Constants exposing (..)

import Components.App.Annotator exposing (Annotator)
import Components.App.Hint exposing (boldSymbolIcon, colorPallet, hintHtml, symbolIcon)
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
    , wordStress : String
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
    , wordStress = "wordStress"
    }


thSoundAnnotator : Annotator
thSoundAnnotator =
    Annotator annotatorIds.soundth "\"th\" sound" <|
        hintHtml [ ( colorPallet "#aaccff", "/ð/ voiced" ), ( colorPallet "#ffbb88", "It will be cut!" ), ( colorPallet "#ddffbb", "/θ/ voiceless" ) ]


edSoundAnnotator : Annotator
edSoundAnnotator =
    Annotator annotatorIds.sounded "\"ed\" sound" <|
        hintHtml [ ( colorPallet "#aaccff", "/t/ voiceless" ), ( colorPallet "#ffbb88", "/d/ voiced" ), ( colorPallet "#ddffbb", "/ɪd/vowel inserted" ) ]


sSoundAnnotator : Annotator
sSoundAnnotator =
    Annotator annotatorIds.sounds "\"s\" sound" <|
        hintHtml [ ( colorPallet "#aaccff", "/s/ voiceless" ), ( colorPallet "#ffbb88", "/z/ voiced" ), ( colorPallet "#ddffbb", "/ɪz/ vowel inserted" ) ]


constantLinksAnnotator : Annotator
constantLinksAnnotator =
    Annotator annotatorIds.link1 "Consonant links" <|
        hintHtml [ ( colorPallet "#ff0000", "Connect" ), ( colorPallet "#0000ff", "Disappear" ) ]


intonationAnnotator : Annotator
intonationAnnotator =
    Annotator annotatorIds.intonationfinal "Intonation" <|
        hintHtml [ ( symbolIcon "⤴️" "#000", "Rise" ), ( symbolIcon "⤵️️" "#000", "Fall" ) ]


pausingAnnotator : Annotator
pausingAnnotator =
    Annotator annotatorIds.pausing "Pausing" <|
        hintHtml [ ( symbolIcon "/" "#00f", "Short Pausing" ), ( symbolIcon "//" "#00f", "Middle Pausing" ), ( symbolIcon "///" "#00f", "Long Pausing" ) ]


contentWordsAnnotator : Annotator
contentWordsAnnotator =
    Annotator "contentword" "ContentWord" <|
        hintHtml [ ( boldSymbolIcon "A↑" "#000", "Content Word" ) ]


vowelLinksAnnotator : Annotator
vowelLinksAnnotator =
    Annotator annotatorIds.link2 "Vowel links" <|
        hintHtml [ ( colorPallet "green", "Insert /j/" ), ( colorPallet "goldenrod", "Insert /w/" ), ( colorPallet "gray", "Connect" ) ]


wordStressAnnotator : Annotator
wordStressAnnotator =
    Annotator annotatorIds.wordStress "Word Stress" <|
        hintHtml [ ( colorPallet "green", "Insert /j/" ) ]


annotators : List Annotator
annotators =
    [ pausingAnnotator
    , intonationAnnotator
    , contentWordsAnnotator
    , wordStressAnnotator
    , edSoundAnnotator
    , thSoundAnnotator
    , sSoundAnnotator
    , constantLinksAnnotator
    , vowelLinksAnnotator
    ]


type alias ViewPhrases =
    { pageTitle : String
    , listenButton : String
    }


viewPhrases : ViewPhrases
viewPhrases =
    { pageTitle = "Pronunciation Scaffolder"
    , listenButton = "Listen"
    }
