// 
var runner = require('./annotationRunner.js');

function myfunc(sentence) {
  if (sentence == '') {
    return sentence;
  }

  var R = ['Do', 'Does', 'Did', 'Is', 'Are', 'Was', 'Were', 'Can', 'Would', 'Could', 'Shall', 'Should', 'Must', 'Oh', 'Will', 'Have', 'Had', ' Has'];
  var P = ['Dr', 'Jr', 'Mr', 'Mrs', 'Miss', 'Ms', 'Prof'];
  var bun = sentence;
  bunlen = 0;
  tmp = "";

  for (i = 0; i < bun.length; i++) {
    flg = 0;
    if (bun[i] == '.' || bun[i] == '?' || bun[i] == '!') {
		
		
      flg = 2;
      sen = bun.slice(bunlen, i + 1);
	  var tango = sen.split(/\W+/);	  
      len = sen.length;
	
	  var fist = tango[0];
	  	
	  for (j = 0; j < tango.length; j++){
		  if (fist <= 1) fist = tango[j];
		  if (tango[j] == 'or' && (sen[len - 1] == '?' || sen[len - 1] == '.')) flg = 2;
		  
	  }
	  
      for (j = 0; j < R.length; j++){		
		if (fist == R[j] && (sen[len - 1] == '?' || sen[len - 1] == '!')) flg = 1;
		if (fist == 'May' && sen[len - 1] == '?') flg = 1;} 
  
	for (j = 0; j < tango.length; j++){
		  
		  for (p = 0; p < P.length; p++){
			if (P[p] == tango[j]) flg = 3;}
	  }
	   
	  bunlen = i + 1;
      tmp += sen;
	  if (flg == 1) tmp += ' ⤴️ ';
	   else if (flg == 2) tmp += ' ⤵️ ';
	   else if (flg == 3) tmp += '';
	  
    }
  }

  if (flg == 0) tmp += bun.slice(bunlen);

	tmp = tmp.replace(/(\sand\s)(\W*)/gi, ' ⤴️ and $2'); 
	tmp = tmp.replace(/(\sbut\s)(\W*)/gi, ' ⤴️ but $2');
	tmp = tmp.replace(/(\sso\s)(\W*)/gi, ' ⤴️ so $2');
	tmp = tmp.replace(/(\sbecause\s)(\W*)/gi, ' ⤴️ because $2');
	tmp = tmp.replace(/(\sor\s)(\W*)/gi, ' ⤴️ or $2');
  
  return tmp;

}

module.exports = {
  id: "intonationfinal",
  run: myfunc,
  type: runner.types.all,
  priority: 1
}