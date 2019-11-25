// 洋葱模型
let arr = [
  ()=>{ console.log(this.x); },
  ()=>{ console.log(this.x); },
  ()=>{ console.log(this.x); }
];

function union(array) {
  if (array.length === 1) {
    return array[0];
  }
  const func = array.pop();
  const nextFunc = array.pop();
  const result = () => {
    (function  (func, parentFunc) {
      func.call(parentFunc);
    })(func, nextFunc);
    nextFunc();
  };
  array.push(result);
  return union(array);
}

union(arr)();