const array = [1, -1, 3, 5, -2, 5, 10, -20, 1, 3];
// 第一种解法

function getMaxIndex(array) {
    let max = Number.MIN_VALUE;
    let startIndex = 0;
    array.map((item, index) => {
        const newMax = max + item;
        if (newMax < item) {
            // 重置求和
            startIndex = index;
            max = item;
        } else if (newMax >= max) {
            max = newMax;
        }
    });
}


/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
 const minWindow = function(s, t) {
  let minStr;
  let l = 0;
  let r = 0;
  const needMap = new Map();
  for(let currChar of t) {
    needMap.set(currChar, needMap.has(currChar) ? needMap.get(currChar) + 1 : 1);
  }
  let needSize = needMap.size;
  while(r < s.length) {
    const currChar = s[r];
    if (needMap.has(currChar)) {
      needMap.set(currChar, needMap.get(currChar) - 1);
      if (needMap.get(currChar) === 0) needSize -= 1;
    }
    while(needSize === 0) {
      // 拿到其中一个答案
      const newRes = s.slice(l, r + 1);
      if (!minStr || (minStr && minStr.length > newRes.length)) {
        console.log(l, r, t, s);
        minStr = newRes;
      }
      const c2 = s[l];
      if (needMap.has(c2)) {
        needMap.set(c2, needMap.get(c2) + 1);
        if (needMap.get(c2) === 1) needSize++;
      }
      l++;
    }
    r++;
  }
  return minStr || '';
};

const s = "aa";
const t = "aaa";
console.log(minWindow(s, t));
