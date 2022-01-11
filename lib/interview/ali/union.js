"use strict";
var _this = this;
// 洋葱模型
var arr = [
    function () { console.log(_this.x); },
    function () { console.log(_this.x); },
    function () { console.log(_this.x); }
];
function union(array) {
    if (array.length === 1) {
        return array[0];
    }
    var func = array.pop();
    var nextFunc = array.pop();
    var result = function () {
        (function (func, parentFunc) {
            func.call(parentFunc);
        })(func, nextFunc);
        nextFunc();
    };
    array.push(result);
    return union(array);
}
union(arr)();
//# sourceMappingURL=union.js.map