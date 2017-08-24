function annotateWithEachWord(annotator, text) {
    return text.split(' ')
               .map(function(word) {
                   return annotator.run(word);
               })
               .join(' ');
}

function annotateWithFullText(annotator, text) {
    return annotator.run(text);
}

function annotate(annotator, text) {
    switch (annotator.type) {
        case types.word:
            return annotateWithEachWord(annotator, text);
            break;
        
        case types.all:
        default:
            return annotateWithFullText(annotator, text);
    }
}

function run(annotator, text) {
    var result = annotate(annotator, text);
    document.getElementById('result').innerHTML = result;
}

function runMulti(annos, text) {
    var result = text;

    console.log(annos[0]);


    annos.forEach(function (annotator){
        result = annotate(annotator, result);
    });
    document.getElementById('result').innerHTML = result;
}

var types = {
    word: 0,
    all: 1
}

module.exports = {
    run: run,
    runMulti: runMulti,
    types: types
}

