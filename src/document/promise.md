#多个promise对象实现顺序执行

## 原理保证每个.then() 返回的新的promise对象
```
function newPromise()
{
    console.log("时间：", new Date());
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
            }, 1000);
        });
}

new Promise((resolve) => { resolve(); }).then(() => {
    return newPromise(); }).then( () => {
        return newPromise();
        });

```
