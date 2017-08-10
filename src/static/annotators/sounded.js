// Developed by Group 10 in Patterns-and-Language in 2017

function finder(word) {
  console.log("finder");
  var tRegex = /ced|fed|ked|ped|sed|xed|hed/;

  var iRegex = /aed|eed|ied|oed|ued|bed|ged|jed|led|med|ned|ged|red|ved|wed|yed|zed/;

  var dRegex = /ded|ted/;

  var result = word;
  if (word.match(tRegex)) {
    result = word.replace(/ed/g, '<span class=\'eth\'>ed</span>');
  } else if (word.match(iRegex)) {
    result = word.replace(/ed/g, '<span class=\'ths\'>ed</span>');
  } else if (word.match(dRegex)) {
    result = word.replace(/ed/g, '<span class=\'theta\'>ed</span>');
  }

  document.getElementById('result').innerHTML = result;
}

module.exports = {
  id: "sounded",
  run: finder
}