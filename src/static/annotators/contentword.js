// group 9

//This regular expression matches content words
//This regular expression doesn't match grammer words.
var gram_words = /^(\b(?:(can|could|dare|have to|had better|may|might|must|need|ought to|shall|should|used to|will|would|Can|Could|Dare|Have to|Had better|May|Might|Must|Need|Ought to|Shall|Should|Used to|Will|Would|about|above|according to|across|after|against|along|along with|among|apart from|around|as|as for|at|because of|before|behind|below|beneath|beside|between|beyond|but|by|by means of|concerning|despite|downduring|except|except for|excepting|for|from|in|in addition to| in back of|in case of|in front of|in place of|inside|in spite of|instead of|into|like|near|next|of|off|on|onto|on top of|out|out of|outside|over|past|regarding|round|since|through|throughout|till|to|toward|under|underneath|unlike|until|up|upon|up to|with|within|without|a|an|the|A|An|The|for|and|nor|but|or|yet|so|than|rather than|whether|as much as|whereas|though|although|even though|while|if|only if|unless|until|provided that|assuming that|even if|in case|in that|lest|that|what|whatever|which|whichever|who|whoever|whom|whomever|whose|where|wherever|how|as though|as if|after|as long as|as soon as|before|by the time|now that|once|since|till|until|when|whenever|while|because|since|so that|in order|why|I|my|me|mine|you|your|yours|he|his|him|she|her|hers|it|its|we|our|us|ours|they|their|them|theirs|My|Me|Mine|You|Your|Yours|He|His|Him|She|Her|Hers|It|Its|We|Our|Us|Ours|They|Their|Them|Theirs|have)\b)).*$/i
//　/（スラッシュ）は正規表現
function wrapContentWordClass(word) {
  word = word.replace(/\s/, ''); //改行が入っているとうまくマッチできないため、removeする

  //content wordかどうかを判定
  if (gram_words.test(word.replace(/'/, '').replace(/"/, '').replace(/”/, '').replace(/\./, '').replace(/\?/, '').replace(/!/, ''))) {
    // word が grammer wordだった場合
    document.getElementById('result').innerHTML = word;
  } else {
    // word が content wordだった場合 
    document.getElementById('result').innerHTML = '<span class="content_word">' + word + '</span>';
  }
}

module.exports = {
  id: "contentword",
  run: wrapContentWordClass
}