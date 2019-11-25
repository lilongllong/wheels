/**
 * 第 31 题：改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。
  for (var i = 0; i< 10; i++){
    setTimeout(() => {
      console.log(i);
      }, 1000)
  }
 */

for (var i = 0; i < 10; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}

for (var i = { index: 0 }; i.index < 10; i.index++) {
  (function (i) {
    setTimeout(() => {
      console.log(i.index);
    }, 1000);
  })(i);
}
