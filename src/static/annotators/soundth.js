// Developed by Group 8 in Patterns-and-Language in 2017

function checkPron(word_input){
  let re_eth = /(the$)|(ther$)|(th[aeiou][^aeiou])/;
  let re_not_eth = /(th.n)/
  let re_ths = /ths$/;
  let word = word_input;

  if(word.match(/th/) == null){
    return [false, word];
  }else if(word == 'lefthand' || word == 'righthand'){
  }else if(word.match(re_eth) != null && word.match(re_not_eth) == null){
    word = word.replace(/th/g,'<span class=\'eth\'>th</span>');
  }else if(word.match(re_ths)){
    word = word.replace(/ths/g, '<span class=\'ths\'>th</span>');
  }else{
    word = word.replace(/th/g,'<span class=\'theta\'>th</span>')
  }
  return word;
}

function run () {
    var input = document.getElementById('input').value;
    checkPron(input);
}

module.exports = {
    run: run
};