var _misoton665$pal$Native_Compromise = function () {

function nouns(text) {
    var nouns = nlp(text).nouns().out('text');

    return _elm_lang$core$Native_Array.fromJSArray(nouns.split(' '));
}

function verbs(text) {
    var verbs = nlp(text).verbs().out('text');

    return _elm_lang$core$Native_Array.fromJSArray(verbs.split(' '));
}

function adverbs(text) {
    var adverbs = nlp(text).match('#Adverb').out('text');

    return _elm_lang$core$Native_Array.fromJSArray(adverbs.split(' '));
}

function adjectives(text) {
    var adjectives = nlp(text).match('#Adjective').out('text');

    return _elm_lang$core$Native_Array.fromJSArray(adjectives.split(' '));
}

return {
    nouns: nouns,
    verbs: verbs,
    adverbs: adverbs,
    adjectives: adjectives
};

}();