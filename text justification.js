/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
  var runChars = 0;
  var runWords = []; 
  var lines = [];
  var lineChars = [];

  for (var i = 0; i < words.length; i++) {
    runWords.push(words[i]);
    runChars += words[i].length;
    if (!words[i+1] || (runChars + words[i+1].length + (runWords.length)) > maxWidth) {
      lines.push(runWords);
      lineChars.push(runChars);
      runWords = [];
      runChars = 0;
    }
  }
  
  lines = lines.map(function(line, i, array) {
    if (line.length === 1 || i === array.length - 1) {
      line = line[0];
      while (line.length < maxWidth) {
        line += " ";
      }
      return line;
    }

    var lineCharCt = lineChars[i];

    var charDiff = maxWidth - lineCharCt;
    var charDiffLeft = charDiff;
    var sepCt = line.length - 1;
    var sepSize = Math.ceil(charDiff / sepCt);

    for (var i = 0; i < line.length - 1; i++) {
      console.log(sepSize);
      line[i] = line[i] + makeSeparator(sepSize);
      charDiffLeft -= sepSize;
      sepSize = Math.ceil(charDiffLeft / --sepCt);
    }

    return line.join('');
  });

  return lines;
};

function makeSeparator(n) {
  var output = "";
  while (output.length < n) {
    output += " ";
  }
  return output;
}

console.log(fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 22));