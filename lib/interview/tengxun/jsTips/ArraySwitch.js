"use strict";
// 伪数组 到 真数组转换
// 1. 使用slice
var aLi = document.querySelectorAll('li');
var arr = Array.prototype.slice.call(aLi);
// 2. ES6的新方法 from
Array.from(arguments);
//# sourceMappingURL=ArraySwitch.js.map