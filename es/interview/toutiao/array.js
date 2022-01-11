"use strict";
/*
给一个数组如：[[“a”,”b”,”c”],[“d”,”e”],…..]得到[ad,ae,bd,be,cd,ce]，手写实现的方法？（要求js实现）
如何将上面的改成函数式编程风格？
如果数组中出现[[“a”,”b”,”c”],[“a”,”d”]]要求去掉”aa”这种情况（即两组所取的元素不能有相同的）？不能用filter…
*/
var data = [['a', 'b', 'c'], ['d', 'e'], ['f', 'a']];
var result = [];
var arr = data.reduce(function (prev, curr) {
    var newArray = [];
    prev.forEach(function (item) {
        curr.forEach(function (subItem) {
            if (!item.includes(subItem)) {
                newArray.push(item.concat(subItem));
            }
        });
    });
    return newArray;
}, ['']);
//# sourceMappingURL=array.js.map