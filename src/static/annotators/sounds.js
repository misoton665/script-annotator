// group 

var runner = require('./annotationRunner.js');

// color
var s = '<span class=\'eth\'>s</span>';
var z = '<span class=\'ths\'>s</span>';
var iz = '<span class=\'theta\'>s</span>';

var b = [];//declares array as the object

//fronted to avoid regex searching replaced strings for apostrophes
//b[0] = /'\w+\b/gi;

var c = [];

//pronunciation of word-final "s" and "es"

//special case
b[0] = /([\s]*this[\s.,\!\?\:\;])/gi;    // pronunciation is /s/

b[1] = /([\s]*[A-Za-z]*[s x z i]es[\s.,\!\?\:\;])/gi;
b[2] = /([\s]*[A-Za-z]*[s c]hes[\s.,\!\?\:\;])/gi;
b[3] = /([\s]*[A-Za-z]*ges[\s.,\!\?\:\;])/gi;
b[4] = /([\s]*[A-Za-z]*dges[\s.,\!\?\:\;])/gi;

b[5] = /([\s]*withs[\s.,\!\?\:\;])/gi;
b[6] = /([\s]*smooths[\s.,\!\?\:\;])/gi;
b[7] = /([\s]*[A-Za-z]*[f p t k]es[\s.,\!\?\:\;])/gi;
b[8] = /([\s]*[A-Za-z]*cks[\s.,\!\?\:\;])/gi;
b[9] = /([\s]*[A-Za-z]*ths[\s.,\!\?\:\;])/gi;

b[10] = /([\s]*[A-Za-z]*[a i u e o b d g j l m n r v y w]s[\s.,\!\?\:\;])/gi;
b[11] = /([\s]*[A-Za-z]*[f p t k c s]s[\s.,\!\?\:\;])/gi;
b[12] = /([\s]*[A-Za-z]*phs[\s.,\!\?\:\;])/gi;

c[0] = s;
c[1] = iz;
c[2] = iz;
c[3] = iz;
c[4] = iz;
c[5] = z;
c[6] = z;
c[7] = s;
c[8] = s;
c[9] = s;
c[10] = z;
c[11] = s;
c[12] = s;


var range_min = 0;
var range_max = 13;

function detector(mystring) {
    processedText = '';
    progress = 0;

    //Variables for script block
    var a = mystring.split(' '); // CHANGED: スペースで単語ごとに分ける. 例: "apple orenge".split(' ')  == ["apple", "orenge"]
    var i;
    var l = a.length;
    var j;
    var ll = b.length;
    var temp = -1;


    for (i = 0; i < l; i++) { // 
        for (j = range_min; j < range_max; j++) { //　jはb[0]からb[11]まで
            if ((a[i] + ' ').search(b[j]) != -1) { // CHANGED:  ' 'がないと対応できないので、単語+' 'をしています
                a[i] = (a[i] + ' ').replace(/s/g, c[j]); // CHANGED: ' 'がないと対応できないので、単語+' 'をしています
                break; // ADDED: 二度置換しないように、ループを抜けます
                // temp = j;
                // finish loop if a[i].search(b[j]) != -1
            }
        }
        //    if(temp != -1){
        //    a[i] = a[i].replace(b[temp],c[temp]);
        // temp = -1;
        // }
    } //end loop

    for (i = 0; i < l; i++) { //start code block for loop 2
        processedText += (a[i]); // CHANGED: 置換した単語たちを連結
    } //end loop

    return processedText;
}

module.exports = {
    id: "sounds",
    run: detector,
    type: runner.types.word
}