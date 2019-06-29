// group 

var runner = require('./annotationRunner.js');

// color
var s = '<span class=\'s1\'>s</span>';
var z = '<span class=\'s2\'>s</span>';
var iz = '<span class=\'s3\'>s</span>';

var b = [];//declares array as the object

//fronted to avoid regex searching replaced strings for apostrophes
//b[0] = /'\w+\b/gi;

var c = [];

//pronunciation of word-final "s" and "es"

//special case
b[0] = /(([\s]*)(this)([\s.,\!\?\:\;]))/gi;    // pronunciation is /s/

b[1] = /(([\s]*)(as)([\s.,\!\?\:\;]))/gi;
b[2] = /(([\s]*)(has)([\s.,\!\?\:\;]))/gi;
b[3] = /(([\s]*)(was)([\s.,\!\?\:\;]))/gi;
b[4] = /(([\s]*)(areas)([\s.,\!\?\:\;]))/gi;
b[5] = /(([\s]*)(is)([\s.,\!\?\:\;]))/gi;
b[6] = /(([\s]*)(his)([\s.,\!\?\:\;]))/gi;
b[7] = /(([\s]*)(bus)([\s.,\!\?\:\;]))/gi;


b[8] = /(([\s]*[A-Za-z]*[s x z i])(es)([\s.,\!\?\:\;]))/gi;
b[9] = /(([\s]*[A-Za-z]*[s c])(hes)([\s.,\!\?\:\;]))/gi;
b[10] = /(([\s]*[A-Za-z]*)(ges)([\s.,\!\?\:\;]))/gi;
b[11] = /(([\s]*[A-Za-z]*)(dges)([\s.,\!\?\:\;]))/gi;

b[12] = /(([\s]*)(withs)([\s.,\!\?\:\;]))/gi;
b[13] = /(([\s]*)(smooths)([\s.,\!\?\:\;]))/gi;
b[14] = /(([\s]*[A-Za-z]*[f p t k])(es)([\s.,\!\?\:\;]))/gi;
b[15] = /(([\s]*[A-Za-z]*)(cks)([\s.,\!\?\:\;]))/gi;
b[16] = /(([\s]*[A-Za-z]*)(ths)([\s.,\!\?\:\;]))/gi;


b[17] = /(([\s]*[A-Za-z]*)(phs)([\s.,\!\?\:\;]))/gi;

b[18] = /(([\s]*[A-Za-z]*)('s)([\s.,\!\?\:\;]))/gi; 
b[19] = /(([\s]*[A-Za-z]*)(`s)([\s.,\!\?\:\;]))/gi;
b[20] = /(([\s]*[A-Za-z]*)(ous)([\s.,\!\?\:\;]))/gi;

b[21] = /(([\s]*)(yes)([\s.,\!\?\:\;]))/gi; 
b[22] = /(([\s]*[Oo]*[asi])(s)([\s.,\!\?\:\;]))/gi; 
b[23] = /(([\s]*)(asher)([\s.,\!\?\:\;]))/gi; 

b[24] = /(([\s]*[A-Za-z]*[a i u e o b d g j l m n r v y w])(s)([\s.,\!\?\:\;]))/gi;
b[25] = /(([\s]*[A-Za-z]*[f p t k c s])(s)([\s.,\!\?\:\;]))/gi;


c[0] = s;

c[1] = z;
c[2] = z;
c[3] = z;
c[4] = z;
c[5] = z;
c[6] = z;

c[7] = s;

c[8] = iz;
c[9] = iz;
c[10] = iz;
c[11] = iz;
c[12] = z;
c[13] = z;
c[14] = s;
c[15] = s;
c[16] = s;

c[17] = s;

c[18] = z;
c[19] = z;
c[20] = s;

c[21] = s;
c[22] = s;
c[23] = s;

c[24] = z;
c[25] = s;


var range_min = 0;
var range_max = 26;

function detector(mystring) {
    processedText = '';
    progress = 0;

    //Variables for script block
    var a = mystring// mystring.split(' '); // CHANGED: スペースで単語ごとに分ける. 例: "apple orenge".split(' ')  == ["apple", "orenge"]
    var i;
    var l = a.length;
    var j;
    var ll = b.length;
    var temp = -1;

    for (j = range_min; j < range_max; j++) { //　jはb[0]からb[11]まで
        if ((a + ' ').search(b[j]) != -1) { // CHANGED:  ' 'がないと対応できないので、単語+' 'をしています
            a = (a + ' ').replace(b[j], function(n0, n1, n2, n3, n4){
                return n2 + n3.replace(/s/g, c[j]) + n4;
            });
            // a = (a + ' ').replace(/s/g, c[j]); // CHANGED: ' 'がないと対応できないので、単語+' 'をしています
            break; // ADDED: 二度置換しないように、ループを抜けます
            // temp = j;
            // finish loop if a[i].search(b[j]) != -1
        }
    }
        //    if(temp != -1){
        //    a[i] = a[i].replace(b[temp],c[temp]);
        // temp = -1;
        // }


    return a;
}

module.exports = {
    id: "sounds",
    run: detector,
    type: runner.types.word,
    priority: 7
}