var runner = require('./annotationRunner.js');

function annotateExclamation(plainText)
{
    var exceptCases = ["Mr.", "Ms.", "Mrs.", "Miss.", "Mt.", "N.Y.", "Prof.", "Dr."];

    // Add newline for triple slash
    var text = plainText;

    // Add triple slashes text
    text = text.replace(/([\w()%]+[\.\!?]+)("?)(.*)/g, function (n0, n1, n2, n3) {
        // If n1 is in exception cases (such as 'Mr.' or 'Ms.')
        if (exceptCases.includes(n1)) {
            return n1 + n2 + annotateExclamation(n3);
        } else {
            return n1 + n2 + "<span class='slash3'>///</span>" + annotateExclamation(n3);
        }
    });	
	
	return text;
}

function annotateComma(text)
{
	  // Add double slashes to text
    text = text.replace(/([\,\:\;])(.*)/g, //"$1<span class='slash2'>//</span>$2");
				function (n0, n1, n2) {
					return n1 + "<span class='slash2'>//</span>" + annotateComma(n2);
				});
	return text;
}

function annotate(plainText) {
	var text = annotateExclamation(plainText);
	text = annotateComma(text);
  
    // Add single slashes to text
    text = text.replace(/(\w+)(\s+)(after|although|because|before|but|considering|directorly|however|though|when|whenever|whether|while)(.*)/g, "$1<span class='slash1'>/</span>$2$3$4");

    // Add single slashes to text
    text = text.replace(/(Today)([ \n])([\w\']+)/g, function (n0, n1, n2, n3) {
        if (n3 == "is" || n3 == "isn't") { // This is for "Today is ..."
            return n1 + n2 + n3;
        } else {
            return n1 + "<span class='slash1'>/</span>" + n2 + n3;
        }
    });

    // Add single slashes to text
    text = text.replace(/(Accordingly|Also|Besides|Consequently|Conversely|Finally|Furthermore|Hence|However|Indeed|Instead|Likewise|Meanwhile|Moreover|Nevertheless|Next|Nonetheless|Otherwise|Similarly|Still|Subsequently|Then|Therefore|Thus)(.*)/g, "$1<span class='slash1'>/</span>$2");

    // Newline to <br>
    // text = text.replace(/\n/g, "<br>");
    return text;
};

module.exports = {
    id: "pausing",
    run: annotate,
    type: runner.types.sentence,
    priority: 4
}