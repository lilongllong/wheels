
/**
 * 题目：
 * add(1); // 1 add(1)(2); // 3
  add(1)(2)(3) // 6
  add(1)(2, 3); // 6
  add(1, 2)(3); // 6
  add(1, 2, 3); // 6
 */

// 限制参数的个数

function currying(add, length) {
  let args = [];
  const self = this;
  const fn = function () {
    const fn_args = [].slice.call(arguments);
    args = args.concat(fn_args);
    if (args.length >= length) {
      return add.apply(null, args);
    } else {
      return fn;
    }
  };
  return fn;
}
function sum() {
  const args = [].slice.call(arguments);
  return args.reduce((a, b) => Number(a)+Number(b), 0);
}

const add = currying(sum, 3);

// 不限参数的写法
// function add() {
//   let args = [].slice.call(arguments);
//   let fn = function(){
//    let fn_args = [].slice.call(arguments)
//    return add.apply(null,args.concat(fn_args))
//  }
// fn.toString = function(){
//   return args.reduce((a,b)=>a+b)
// }
// return fn
// }
// add(1);
console.log(add(1, 3)(2));