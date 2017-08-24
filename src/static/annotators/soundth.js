// Developed by Group 8 in Patterns-and-Language in 2017

var runner = require('./annotationRunner.js');

function checkPron(word_input) {
  var reeth = /(the$)|(ther$)|(th[aeiou][^aeiou])/;
  var renoteth = /(th.n)/
  var reths = /ths$/;
  var reth = /th/;
  var word = word_input;

  if (word.match(/th/) == null) {
    word = word;
  } else if (word == 'lefthand' || word == 'righthand') {
  } else if (word.match(reeth) != null && word.match(renoteth) == null) {
    word = word.replace(/th/g, '<span class=\'th1\'>th</span>');
  } else if (word.match(reths)) {
    word = word.replace(/ths/g, '<span class=\'th2\'>th</span>');
  } else if (word.match(reth)) {
    word = word.replace(/th/g, '<span class=\'th3\'>th</span>');
  }

  return word;
}

module.exports = {
  id: "soundth",
  run: checkPron,
  type: runner.types.word,
  priority: 4
};
