module Components.App.Constants exposing (..)


type Annotator
    = Annotator Int String


type alias Annotators =
    { sample : Annotator
    , soundTh : Annotator
    }


annotators : Annotators
annotators =
    { sample = Annotator 1 "Sample"
    , soundTh = Annotator 2 "Sound \"th\""
    }


type alias ViewPhrases =
    { pageTitle : String
    }


viewPhrases : ViewPhrases
viewPhrases =
    { pageTitle = "Script annotator (2017 E317 patterns and language)"
    }
