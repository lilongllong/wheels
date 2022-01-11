class A {
}

class B extends A {
}

class C extends B {
  
}
// Object.getPrototypeOf(instance) 获取实例的原型
// 使用instanceOf，只需实例一个对象 instance instanceOf AClass
// constructor 创建该对象的构造函数的原型 __proto__， prototype，和实例 一样是指向这里 [Function: A]
// prototype 是每个function都具有的属性，是原型对象，__proto__是每个对象都具有的属性
function isAncestor (AClass, BClass) {
  let currProto = BClass.__proto__;
  console.log(currProto, currProto.constructor, AClass.constructor);
  while (currProto) {
    if (currProto.prototype === AClass.prototype) {
      return true;
    }
    currProto = currProto.__proto__;
  }
  return false;
}
console.log(isAncestor(A, B),
isAncestor(A, C),
isAncestor(B, C),
isAncestor(C, A));
const Binstance = new B();
console.log(Object.getPrototypeOf(Binstance) === A.prototype, Object.prototype.toString.call(Binstance), );
// expected output: true
