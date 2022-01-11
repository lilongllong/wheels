// 去重的n种方式
const array = [1, 3, 2, 4, 5, 1, 2,];
const arr1 = Array.from(new Set(array));
console.log(arr1);

// 寻找最大值
console.log(Math.max.apply(null,array));
console.log(Math.max.call(null, ...array));
// 变量提升, 变量提升并不是无限制的提升，是提升到相邻作用域
// 立即执行函数，会创建一个对立的作用域，外部访问不到其内部，因此外部var key = 'number' 并不会影响这个
var key = 'number';
(function () {
  // 提升到这里，块级作用域
  console.log(this);
	if (typeof key === 'undefined') {
    var key = 'number1';
    console.log('hello' + key);
	} else {
		console.log('goodby' + key);
	}
})()

// 匿名函数的应用
const arrayFunc = [];
for(var i=0; i<6; i++){
  (function(i){
    arrayFunc[i] = function () {
      console.log(i) // 为什么 alert 出来的总是 6，而不是 0、1、2、3、4、5
    }
  })(i)
}

for(var index=0; index<6; index++){
  arrayFunc[index]();
}

// 原型链题目
var length = 5;
//此处 window.length = 5;

function func () {
  console.log(this.length);
}

const obj = {
  length: 10,
  method: function () {
    // method的作用域是 obj
    func(); // 此处无人调用，默认是全局window调用
    arguments[0](); // 相当于arguments.[0]来调用，所有是arguments来调用，arguments的length是2
  }
};
obj.method(func, 1); 

function* gen() {
  yield  123 + 456;
}
const limitState = gen();
console.log(limitState);
