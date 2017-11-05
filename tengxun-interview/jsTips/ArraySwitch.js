// 伪数组 到 真数组转换
// 1. 使用slice
const aLi = document.querySelectorAll('li');
const arr = Array.prototype.slice.call(aLi);
// 2. ES6的新方法 from
Array.from(arguments);
