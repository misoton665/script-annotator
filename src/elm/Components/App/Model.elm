module Components.App.Model exposing (..)

import Components.App.Constants exposing (Annotator)


type alias Model =
    { enabledAnnotator : List Annotator
    }


initialModel : Model
initialModel =
    { enabledAnnotator = []
    }
