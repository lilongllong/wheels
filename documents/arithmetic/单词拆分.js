function wordBreak(paragraph,words) {
  return word_Break(paragraph, words, 0);
}

var map = {};

function word_Break(paragraph, words, start) {
  if (map[start]) {
    return map[start];
  }
  let res = 0;
  if (start == paragraph.length) {
    res = 1;
  }
  for (let end = start + 1; end <= paragraph.length; end++) {
    if (words.indexOf(paragraph.slice(start, end)) > -1) {
      const list = word_Break(paragraph, words, end);
      res += list;
    }
  }
  map[start]=res;
  return res;
}

console.log(wordBreak('makeuptopout', ''.split(';')));
