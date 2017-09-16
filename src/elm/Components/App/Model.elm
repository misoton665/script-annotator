module Components.App.Model exposing (..)

import Html exposing (Html)


type alias AnnotatorId =
    String


type alias Model =
    { enabledAnnotatorIds : List AnnotatorId
    }


initialModel : Model
initialModel =
    { enabledAnnotatorIds = []
    }


isEnabledAnnotatorId : AnnotatorId -> Model -> Bool
isEnabledAnnotatorId id model =
    List.any ((==) id) model.enabledAnnotatorIds
