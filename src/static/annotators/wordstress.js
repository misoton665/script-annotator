
var runner = require('./annotationRunner.js');

function boldedWordStress(str) {

	// noun, adjective: *ho*ge
	// 		exe: samples, carton, purple, rainy, china,  happy.
	// verb, adverb: ho*ge*
	// 		exe: relax, receive, direct, among, aside, between.

	// iconic, graphic, hypertension, ...
	/*function boldedSecondFromEndSyllable(match) {
		var bolded_regexp = new RegExp('([bcdfghjklmnpqrstvwxz]+[aeiou]+[bcdfghjklmnpqrstvwxz]*)' + word[i]);
		match = match.replace(bolded_regexp, "<span style=\"background: #FF0\">$1</span>" + word[i] );
		return match;
	}
	// lemonade, jamboree, unique, ...
	function boldedWordEnding(match) {
		var bolded_regexp = new RegExp('([bcdfghjklmnpqrstvwxz]*)' + word[i]);
		match = match.replace(bolded_regexp, "<span style=\"background: #FF0\">$1" + word[i] + "</span>");
		return match;
	}
	// democracy, geography, critical, ...
	function boldedThirdFromEndSyllable(match) {
		var bolded_regexp = new RegExp('([bcdfghjklmnpqrstvwxz]+[aeiou]+)([bcdfghjklmnpqrstvwxz]+[aeiou]+[bcdfghjklmnpqrstvwxz]*)' + word[i]);
		match = match.replace(bolded_regexp, "<span style=\"background: #FF0\">$1</span>$2" + word[i]);
		return match;
	}
	// orderly, silently, lovingly, ...
	function boldedFirstSyllable(match) {
		var bolded_regexp = new RegExp(/(\b)([bcdfghjklmnpqrstvwxz]*[aeiou]+[bcdfghjklmnpqrstvwxz]*)/);
		match = match.replace(bolded_regexp, "$1<span style=\"background: #FF0\">$2</span>");
		return match;
	}
	// rarity, potimal, gradient, ...
	function boldedFirstSyllableVerCon(match) {
		var bolded_regexp = new RegExp(/(\b)([bcdfghjklmnpqrstvwxz]*[aeiou]+[bcdfghjklmnpqrstvwxz]*)/);
		match = match.replace(bolded_regexp, "$1<span style=\"background: #FF0\">$2</span>");
		return match;
	}

	var regexp;
	var i;
	var word = [];

	word[0]  = "able"; word[1]  = "ical"; word[2]  = "cian";
	word[3]  = "ery";  word[4]  = "ible"; word[5]  = "ic";
	word[6]  = "ics";  word[7]  = "ion";  word[8]  = "ia";
	word[9]  = "ious"; word[10] = "ish";  word[11] = "osis";
	
	var numSecondFromEndSyllable = 12;
	for (i=0; i<numSecondFromEndSyllable; i++) {
		regexp = new RegExp('\\b(?:[bcdfghjklmnpqrstvwxz]*[aeiou]+[bcdfghjklmnpqrstvwxz]*)+' + word[i] + '\\b', 'g');
		str = str.replace(regexp, boldedSecondFromEndSyllable);
	}

	word[0] = "ade"; word[1] = "ee"; word[2] = "eer";
	word[3] = "ese"; word[4] = "ette"; word[5] = "que";
	word[6] = "oon";
	
	var numWordEnding = 7;
	for (i=0; i<numWordEnding; i++) {
		regexp = new RegExp('\\b(?:[bcdfghjklmnpqrstvwxz]*[aeiou]+[bcdfghjklmnpqrstvwxz]*)+' + word[i] + '\\b', 'g');
		str = str.replace(regexp, boldedWordEnding);
	}

	word[0] = "cy"; word[1] = "ty"; word[2] = "phy";
	word[3] = "gy"; word[4] = "al";
	
	var numThirdFromEndSyllable = 5;
	for (i=0; i<numWordEnding; i++) {
		regexp = new RegExp('\\b(?:[bcdfghjklmnpqrstvwxz]*[aeiou]+[bcdfghjklmnpqrstvwxz]*)+' + word[i] + '\\b', 'g');
		str = str.replace(regexp, boldedThirdFromEndSyllable);
	}

	word[0] = "er"; word[1] = "ly";
	
	var numFirstSyllable = 2;
	for (i=0; i<numFirstSyllable; i++) {
		regexp = new RegExp('\\b(?:[bcdfghjklmnpqrstvwxz]*[aeiou]+[bcdfghjklmnpqrstvwxz]*){2,}' + word[i] + '\\b', 'g');
		str = str.replace(regexp, boldedFirstSyllable);
	}

	// output bolded string
	
	*/
	
	var WSjson = require('./wordStresses.json');
	var stresses = 0;
	var syllables = 1;
	
	var res = str.split(/\W+/);
	
	res.forEach(function(element){
		var word = element.toLowerCase(); 
		
		//
		if (word.length > 2){
						
			if (WSjson[word]){	
				if (WSjson[word][syllables].length > 1){
					str = str.replace(element, stressSearch(element));
					
				}								
			}				
		}
	});
	
	
	function stressSearch(word) {		
		
		var retWord = word;
		
		WSjson[word.toLowerCase()][stresses].forEach(function(element, index, array) {			
			
			var syll = WSjson[word.toLowerCase()][syllables][index];
			var idx = retWord.toLowerCase().indexOf(syll);
			if (element == 1) {
				
				retWord = retWord.substr(0, idx) + "<span style=\"background: #FF0\">" + retWord.substr(idx, syll.length) + "</span>" + retWord.substr(idx + syll.length);
			}
		});
		
		return retWord;
		
	}
	
	return str;
}

module.exports = {
    id: 'wordStress',
    run: boldedWordStress,
    type: runner.types.word,
    priority: 15
};
