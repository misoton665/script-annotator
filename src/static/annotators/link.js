"use strict";

// group 5

var runner = require('./annotationRunner.js');


var generateMarkingText = function (fullText) {
    var splitText = fullText.split(" ");
    var markingText = "";

    for (var index = 0; index < splitText.length - 1; index++) {
        if (isDisappear(splitText[index], splitText[index + 1])) markingText = markingText + splitText[index] + '<span style="color:#0000ff;">_</span>';
        else if (isConnected(splitText[index], splitText[index + 1])) markingText = markingText + splitText[index] + '<span style="color:#ff0000;">_</span>';
        else markingText = markingText + splitText[index] + ' ';
    }

    markingText += splitText[splitText.length - 1];

    return markingText;
}

var isConnected = function (word1, word2) {
    var str = word1 + ' ' + word2;

    if (str.match(/\b\S*[^aiouI.,] [aeiouAEIOU]\S*\b/)) return true;
    else if (str.match(/\b\S*[tdsz] y\S*\b/)) return true;

    return false;
}

var isDisappear = function (word1, word2) {
    var str = word1 + ' ' + word2;

    if (str.match(/\b\S*([^aiou]) \1\S*\b/)) return true;
    else if (str.match(/\b\S*(t|th|d) (t|th|d|T|Th|D)\S*\b/)) return true;
    else if (str.match(/\b\S*(ve|p|f) [bpBP]\S*\b/)) return true;
    else if (str.match(/\b\S*(s|sh|ts) (s|sh|ts|S|Sh|Ts)\S*\b/)) return true;
    else if (str.match(/\b\S*(c|k|ke|g|que) (c|k|g|que|C|K|G|Que)\S*\b/)) return true;
    else if (str.match(/\b\S*l l\S*\b/)) return true;
    else if (str.match(/\b\S*[^aiou.,] (and|on|in)\b/)) return true;
    else if (str.match(/\b\S*[^aiou.,] (of|or)\b/)) return true;

    return false;
}

module.exports = {
    id: 'link1',
    run: generateMarkingText,
    type: runner.types.all,
    priority: 0
};