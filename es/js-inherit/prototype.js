"use strict";
function A(name) {
    this.name = name;
}
A.prototype.clone = function () {
    return Object.create(A);
};
function B(name) {
    A.apply(this, [name]);
    console.log("b create");
}
var a = new A("Aclass");
B.prototype = a.clone();
a.name = "ss";
var b = new B("Bclass");
b.name = "dsf";
console.log(B);
console.log(b.name);
//# sourceMappingURL=prototype.js.map