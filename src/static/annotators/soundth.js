// Developed by Group 8 in Patterns-and-Language in 2017

var runner = require('./annotationRunner.js');

function checkPron(word_input) {

  var reeth = /([Tt]he$)|([Tt]her$)|([Tt]h[aeiou][^aeiou])|ith|[Tt]he|[Tt]hou/;
  var renoteth = /([Tt]h.n)/
  var reths = /[Tt]hs$/;
  var reth = /[Tt]h/;
  var word = word_input;

  if (word.match(/[Tt]h/) == null) {
    word = word;
  } else if (word == 'lefthand' || word == 'righthand') {
  } else if (word.match(reeth) != null && word.match(renoteth) == null) {
    word = word.replace(/th/g, '<span class=\'th1\'>th</span>');
    word = word.replace(/Th/g, '<span class=\'th1\'>Th</span>');
  } else if (word.match(reth)) {
    word = word.replace(/th/g, '<span class=\'th3\'>th</span>');
    word = word.replace(/Th/g, '<span class=\'th3\'>Th</span>');
  }

  return word;
}

module.exports = {
  id: "soundth",
  run: checkPron,
  type: runner.types.word,
  priority: 4
};
