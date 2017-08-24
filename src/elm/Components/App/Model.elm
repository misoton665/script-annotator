module Components.App.Model exposing (..)

import Components.App.Annotator exposing (AnnotatorId)


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