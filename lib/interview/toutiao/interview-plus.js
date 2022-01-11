"use strict";
/**
 * 如何用利用正则将连字符“on-interview-day”变成驼峰“onInterviewDay”
 */
var str = 'on-interview-day';
str.replace(/-[a-z]/g, function (str) { return str.toUpperCase().slice(1); });
/**
 * html属性中的src和href的区别是什么?
 * 1. href是Hypertext Reference的缩写，表示超文本引用。用来建立当前元素和文档之间的链接。常用的有：link、a。
 * 浏览器会识别该文档为css文档，并行下载该文档，并且不会停止对当前文档的处理。这也是建议使用link，而不采用@import加载css的原因
 * 2. src是source的缩写，src的内容是页面必不可少的一部分，是引入。src指向的内容会嵌入到文档中当前标签所在的位置。常用的有：img、script、iframe。
 * 当浏览器解析到该元素时，会暂停浏览器的渲染，知道该资源加载完毕。这也是将js脚本放在底部而不是头部得原因
 */ 
//# sourceMappingURL=interview-plus.js.map