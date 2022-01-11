"use strict";
function fun() {
    return new Promise(function (resolve, reject) {
        reject('failed');
    });
}
function tryAgain(func, count) {
    return new Promise(function (resolve, reject) {
        if (count === 0) {
            reject(new Error('请求失败'));
        }
        else {
            console.log('xxx');
            func().then(resolve).catch(function () {
                tryAgain(func, count - 1).then(resolve).catch(reject);
            });
        }
    });
}
tryAgain(fun, 10).then(function (data) {
    console.log('成功');
}).catch(function (error) {
    console.log('失败ss', error.message);
});
//# sourceMappingURL=promiseCount.js.map