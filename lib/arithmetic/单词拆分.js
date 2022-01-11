"use strict";
function wordBreak(paragraph, words) {
    return word_Break(paragraph, words, 0);
}
var map = {};
function word_Break(paragraph, words, start) {
    if (map[start]) {
        return map[start];
    }
    var res = 0;
    if (start == paragraph.length) {
        res = 1;
    }
    for (var end = start + 1; end <= paragraph.length; end++) {
        if (words.indexOf(paragraph.slice(start, end)) > -1) {
            var list = word_Break(paragraph, words, end);
            res += list;
        }
    }
    map[start] = res;
    return res;
}
console.log(wordBreak('makeuptopout', ''.split(';')));
//# sourceMappingURL=%E5%8D%95%E8%AF%8D%E6%8B%86%E5%88%86.js.map