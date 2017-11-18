var util = require('./annotationUtils.js');

function annotateWithEachWord(annotator, text) {
    var annotateText = function(txt) {
        return txt.split(' ').map(function(word){
            return annotator.run(word);
        }).join(' ');
    }

    return util.splitByTag(text)
            .map(function(txt){
                if (util.isTagged(txt)) {
                    return util.doWithtUntagged(txt, annotateText);
                } else {
                    return annotateText(txt);
                }
            }).join('');
}

function annotateWithEachSentence(annotator, text) {
    var annotateText = function(txt) {
        return txt.split(/([^\.]*\.\s*)/g).map(function(word){
            return annotator.run(word);
        }).join('');
    }

    return util.splitByTag(text)
            .map(function(txt){
                if (util.isTagged(txt)) {
                    return util.doWithtUntagged(txt, annotateText);
                } else {
                    return annotateText(txt);
                }
            }).join('');
}

function annotateWithFullText(annotator, text) {
    return annotator.run(text);
}

function annotate(annotator, text) {
    switch (annotator.type) {
        case types.word:
            return annotateWithEachWord(annotator, text);
            break;
        
        case types.sentence:
            return annotateWithEachSentence(annotator, text);
            break;
        
        case types.all:
        default:
            return annotateWithFullText(annotator, text);
    }
}

function run(app, annotator, text) {
    var result = annotate(annotator, text);
    
    document.getElementById('result').innerHTML = result;
}

function runMulti(app, annos, text) {
    var result = text;

    annos.forEach(function (annotator){
        result = annotate(annotator, result);
    });
    
    document.getElementById('result').innerHTML = result;
}

var types = {
    all: 0,
    sentence: 1,
    word: 2
}

module.exports = {
    run: run,
    runMulti: runMulti,
    types: types
}

