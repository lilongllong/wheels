## 实现防抖和节流

### 防抖
触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间
```
function debounce (fn, time) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, time)
  };
}
```

### 节流
高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。
```
function throttle (fn, time) {
  function throttle (func, time) {
    let timer = null;
    let args = null;
    return function wrapper() {
      if (timer) {
        args = arguments;
      } else {
        args = arguments;
        timer = setTimeout(() => {
          func.apply(this, arguments);
          clearTimeout(timer);
          timer = null;
        }, time);
      }
    };
  }
}
```