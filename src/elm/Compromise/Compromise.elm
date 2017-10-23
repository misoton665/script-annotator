module Compromise exposing (..)

import Array
import Native.Compromise


tailOrEmpty : List String -> List String
tailOrEmpty =
    List.filter <| (/=) ""


nouns : String -> List String
nouns =
    tailOrEmpty << Array.toList << Native.Compromise.nouns


verbs : String -> List String
verbs =
    tailOrEmpty << Array.toList << Native.Compromise.verbs


generalVerbs : String -> List String
generalVerbs =
    List.filter (\x -> not <| List.any ((==) x) beVerbs) << verbs


generalVerbs_ : String -> List String
generalVerbs_ =
    List.filter (\x -> not <| List.any ((==) x) <| causativeVerbs ++ beVerbs) << verbs


causativeVerbs : List String
causativeVerbs =
    [ "let", "have", "get", "make" ]


beVerbs : List String
beVerbs =
    [ "be", "am", "are", "is", "was", "were" ]


adjectives : String -> List String
adjectives =
    tailOrEmpty << Array.toList << Native.Compromise.adjectives


adverbs : String -> List String
adverbs =
    tailOrEmpty << Array.toList << Native.Compromise.adverbs
