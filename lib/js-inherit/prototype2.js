"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
// Object.getPrototypeOf(instance) 获取实例的原型
// 使用instanceOf，只需实例一个对象 instance instanceOf AClass
// constructor 创建该对象的构造函数的原型 __proto__， prototype，和实例 一样是指向这里 [Function: A]
// prototype 是每个function都具有的属性，是原型对象，__proto__是每个对象都具有的属性
function isAncestor(AClass, BClass) {
    var currProto = BClass.__proto__;
    console.log(currProto, currProto.constructor, AClass.constructor);
    while (currProto) {
        if (currProto.prototype === AClass.prototype) {
            return true;
        }
        currProto = currProto.__proto__;
    }
    return false;
}
console.log(isAncestor(A, B), isAncestor(A, C), isAncestor(B, C), isAncestor(C, A));
var Binstance = new B();
console.log(Object.getPrototypeOf(Binstance) === A.prototype, Object.prototype.toString.call(Binstance));
// expected output: true
//# sourceMappingURL=prototype2.js.map