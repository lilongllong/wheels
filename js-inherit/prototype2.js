class A {
}

class B extends A {
}

class C extends B {
  
}

function isAncestor (AClass, BClass) {
  	const bInstance = new BClass();
 	const aInstance = new AClass();
    // console.log(bInstance instanceof AClass);
    // let 
    // while(true) {
    //   if ()
    // }
    try {
      
    } catch (error) {
      
    }
    console.log(Object.getPrototypeOf(bInstance).__proto__.__proto__, AClass.prototype);
  	console.log(Object.getPrototypeOf(bInstance).__proto__.__proto__ === AClass.prototype);
}

isAncestor(A, B)
isAncestor(A, C)
isAncestor(B, C)
isAncestor(C, A)
const prototype1 = {};
const object1 = Object.create(prototype1);

console.log(Object.getPrototypeOf(object1) === prototype1);
// expected output: true
