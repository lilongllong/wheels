"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
// 去重的n种方式
var array = [1, 3, 2, 4, 5, 1, 2,];
var arr1 = Array.from(new Set(array));
console.log(arr1);
// 寻找最大值
console.log(Math.max.apply(null, array));
console.log((_a = Math.max).call.apply(_a, __spreadArray([null], array, false)));
// 变量提升, 变量提升并不是无限制的提升，是提升到相邻作用域
// 立即执行函数，会创建一个对立的作用域，外部访问不到其内部，因此外部var key = 'number' 并不会影响这个
var key = 'number';
(function () {
    // 提升到这里，块级作用域
    console.log(this);
    if (typeof key === 'undefined') {
        var key = 'number1';
        console.log('hello' + key);
    }
    else {
        console.log('goodby' + key);
    }
})();
// 匿名函数的应用
var arrayFunc = [];
for (var i = 0; i < 6; i++) {
    (function (i) {
        arrayFunc[i] = function () {
            console.log(i); // 为什么 alert 出来的总是 6，而不是 0、1、2、3、4、5
        };
    })(i);
}
for (var index = 0; index < 6; index++) {
    arrayFunc[index]();
}
// 原型链题目
var length = 5;
//此处 window.length = 5;
function func() {
    console.log(this.length);
}
var obj = {
    length: 10,
    method: function () {
        // method的作用域是 obj
        func(); // 此处无人调用，默认是全局window调用
        arguments[0](); // 相当于arguments.[0]来调用，所有是arguments来调用，arguments的length是2
    }
};
obj.method(func, 1);
function gen() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, 123 + 456];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
var limitState = gen();
console.log(limitState);
//# sourceMappingURL=TB-interview.js.map