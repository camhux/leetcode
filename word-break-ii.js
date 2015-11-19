/**
 * @param {string} s
 * @param {set<string>} wordDict
 *   Note: wordDict is a Set object, see:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
  var solutions = [];
  var memory = {};

  function subroutine(s, startIndex, words) {
    if (words == null) words = [];

    var nextWords;
    var i;
    var substring = '';

    for (i = startIndex; i < s.length; i++) {

      substring += s[i];

      if (wordDict.has(substring)) {

        nextWords = words.concat([substring]);

        if (i === s.length - 1) {

          solutions.push(nextWords.join(' '));

        } else {

          subroutine(s, i + 1, nextWords);

        }
      }
    }
  }

  subroutine(s, 0);

  return solutions;

};
