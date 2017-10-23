module Components.Parse exposing (..)

import Compromise
import Html exposing (..)
import Html.Attributes exposing (..)
import List.Extra
import Regex exposing (HowMany(All), Regex, regex, replace)
import String


-- 入力された英文をHtmlに変換


parse : String -> Html a
parse txt =
    let
        -- #をつけた文字列
        markedText =
            markText txt

        -- "#This is a #pen ." -> ["#This", "is", "a", "#pen", "."]
        markedWords =
            String.split " " markedText

        -- ["#This", "is", "a", "#pen", "."] -> <span style="font-size: 140%">This</span> <span ...
        parsedSentence =
            List.foldl (\x acc -> x :: text " " :: acc) [] <| List.map toLargeIfMarked markedWords
    in
    div [] <| List.reverse parsedSentence



-- 一文字目が#なら大きく表示するHTMLタグに、そうでなければ普通サイズで表示するHTMLタグに変換


toLargeIfMarked : String -> Html a
toLargeIfMarked word =
    case String.uncons word of
        Just ( '#', txt ) ->
            toLargeFontText <| String.fromList <| List.filter ((/=) '#') <| String.toList txt

        Just ( h, txt ) ->
            toNormalFontText <| String.fromChar h ++ txt

        _ ->
            text ""



-- 一文字目が#かどうか


isMarked : String -> Bool
isMarked word =
    case String.uncons word of
        Just ( '#', _ ) ->
            True

        _ ->
            False



-- 正規表現を使って大きく表示したい単語の先頭に#をつける


markText : String -> String
markText txt =
    let
        addMarkIfMatch regex text =
            replace All
                regex
                (\x ->
                    let
                        deb =
                            Debug.log "m" x
                    in
                    if isMarked x.match then
                        x.match
                    else
                        "#" ++ x.match
                )
                text
    in
    List.foldl (\reg txt_ -> addMarkIfMatch reg txt_) txt <| contentWordRegexes txt



-- 大きく表示したい単語の正規表現


contentWordRegexes : String -> List Regex
contentWordRegexes txt =
    let
        regexes analyzer =
            List.map regex <| analyzer txt
    in
    [ -- be動詞前の代名詞
      regex "(I|You|you|He|he|She|she|They|they|We|we|It|it)\\s(?=be|been|am|was|are|is|were)"

    -- 1単語目
    , regex "^(?![Aa]|[Tt]he)(.+)(?=[^A-Za-z]|$)"

    --        -- 形容詞
    --    ,   regex "([A-Za-z][a-z]+ly)(?=[^A-Za-z]|$)"
    --
    --        -- 副詞
    --    ,   regex "([A-Za-z][a-z]+al)(?=[^A-Za-z]|$)"
    --
    --        -- 名詞
    --    ,   regex "([Pp]ens?|[Cc]ats?|[Dd]ogs?|[Mm][ae]m|[Ww]om[ae]n|[Nn]ames?|[Mm]ary|[Bb]ob|[Pp]layings?|[Ww]alkings?|[Gg]oings?|[Dd]oings?|[Mm]akings?)(?=[^A-Za-z]|$)"
    --
    --        -- 一般動詞
    --    ,   regex "([Pp]lay(ed)?|[Ww]alk(ed)?|[Gg]o(es)?|[Ww]ent|[Dd]o(es)?|[Dd]id|[Mm]ake|[Mm]ade)(?=[^A-Za-z]|$)"
    ]
        ++ regexes Compromise.nouns
        ++ regexes Compromise.generalVerbs_
        ++ regexes Compromise.adverbs
        ++ regexes Compromise.adjectives


nouns : List String
nouns =
    Compromise.nouns "I am a dog"


verbs : List String
verbs =
    [ "play", "walk", "go", "do", "make" ]



-- 文字列を大きく表示するHTMLタグに変換


toLargeFontText : String -> Html a
toLargeFontText txt =
    span [ style [ ( "font-size", "140%" ) ] ] [ text txt ]



-- 文字列を普通サイズで表示するHTMLタグに変換


toNormalFontText : String -> Html a
toNormalFontText txt =
    span [ style [ ( "font-size", "100%" ) ] ] [ text txt ]


add : Int -> Int -> Int
add =
    (+)
