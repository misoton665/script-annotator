// 
var runner = require('./annotationRunner.js');

function myfunc(sentence) {
  if (sentence == '') {
    return sentence;
  }

  var R = ['Do', 'Does', 'Did', 'Is', 'Are', 'Was', 'Were', 'Can', 'Would', 'Could', 'Shall', 'Should', 'Must', 'Oh'];
  var bun = sentence;
  bunlen = 0;
  tmp = "";

  for (i = 0; i < bun.length; i++) {
    flg = 0;
    if (bun[i] == '.' || bun[i] == '?' || bun[i] == '!') {
      flg = 2;
      sen = bun.slice(bunlen, i + 1);
      bunlen = i + 1;
      tmp += sen;

      var tango = sen.split(" ");
      len = sen.length;
      for (j = 0; j < R.length; j++)
        if (R[j] == tango[0] && (sen[len - 1] == '?' || sen[len - 1] == '!')) flg = 1;
      if (tango[0] == 'May' && sen[len - 1] == '?') flg = 1;

      for (j = 0; j < tango.length; j++)
        if (tango[j] == 'or' && (sen[len - 1] == '? ' || sen[len - 1] == '.')) flg = 2;

      if (flg == 1) tmp += ' ⤴️ ';
      else if (flg == 2) tmp += ' ⤵️ ';
    }
  }

  if (flg == 0) tmp += bun.slice(bunlen);

	tmp = tmp.replace(/(\sand)(\W*)/gi, ' ⤴️ and$2'); 
	tmp = tmp.replace(/(\sbut)(\W*)/gi, ' ⤴️ but$2');
	tmp = tmp.replace(/(\sso)(\W*)/gi, ' ⤴️ so$2');
	tmp = tmp.replace(/(\sbecause)(\W*)/gi, ' ⤴️ because$2');
	tmp = tmp.replace(/(\sor)(\W*)/gi, ' ⤴️ or$2');
  
  return tmp;

}

module.exports = {
  id: "intonationfinal",
  run: myfunc,
  type: runner.types.all,
  priority: 1
}