// group ?

function annotate(text) {
  regexs = [];
  regexs[0] = /(i|y|igh|sea|tea|be|maybe|ee|he|she|ie|we|ye|[2-9]0) (a|e|i|o[^(ne)]|u|hon|w[^hr]|y)/gmi;
  regexs[1] = /(oe|ue|[aeiou]we|[a-z]th[a-z]+gh|lough|o|ew|ow|oh|lt|to|[aeiou]ux) (a|e|i|o[^(ne)]|u|hon|w[^hr]|y)/gmi;
  regexs[2] = /(a|i|o|r|u|w|y|be|ee|he|re|ue|igh|we|lough|th[a-z]+gh|^[2-4]|[^1][2-4]|[2-9]0) (.)/gmi;

  colors = [];
  colors[0] = "Red";
  colors[1] = "Goldenrod";
  colors[2] = "Gray";

  for (var i = 0, len = regexs.length; i < len; i++) {
    text = text.replace(regexs[i], '$1<font color="' + colors[i] + '">_</font>$2');
  }

  document.getElementById('result').innerHTML = text;
}

module.exports = {
  id: "link2",
  run: annotate
};
