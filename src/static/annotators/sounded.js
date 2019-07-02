// Developed by Group 10 in Patterns-and-Language in 2017

var runner = require('./annotationRunner.js');

function finder(word) { 
  
  var tRegex = /ced|fed|ked|ped|sed|xed|hed/;

  var iRegex = /aed|eed|ied|oed|ued|bed|ged|jed|led|med|ned|ged|red|ved|wed|yed|zed/;

  var dRegex = /ded|ted/;
  
  var exRegex = /crooked|dogged|naked|rugged|wicked|wretched/;

  var result = word;
  
    
  if (word.match(exRegex)) {
    result = word.replace(/([A-Za-z]*)(ed)(\W*$)/g, '$1<span class=\'ed3\'>$2</span>$3');
  } else if (word.match(tRegex)) {
    result = word.replace(/([A-Za-z]*)(ed)(\W*$)/g, '$1<span class=\'ed1\'>$2</span>$3');
  } else if (word.match(iRegex)) {
    result = word.replace(/([A-Za-z]*)(ed)(\W*$)/g, '$1<span class=\'ed2\'>$2</span>$3');
  } else if (word.match(dRegex)){
    result = word.replace(/([A-Za-z]*)(ed)(\W*$)/g, '$1<span class=\'ed3\'>$2</span>$3');
  }
  return result;
}

module.exports = {
  id: "sounded",
  run: finder,
  type: runner.types.word,
  priority: 5
}