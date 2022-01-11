"use strict";
var promise = /** @class */ (function () {
    function promise(handler) {
        var _this = this;
        this.resolveHandler = null;
        this.rejectedHandler = null;
        setTimeout(function () {
            handler(_this.resolveHandler, _this.rejectedHandler);
        }, 0);
    }
    promise.prototype.then = function (resolve, reject) {
        this.resolveHandler = resolve;
        this.rejectedHandler = reject;
        return this;
    };
    return promise;
}());
function getPromise() {
    return new promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(20);
        }, 1000);
    });
}
getPromise().then(function (res) {
    console.log(res);
}, function (error) {
    console.log(error);
});
var promise1 = getPromise();
setTimeout(function () {
    promise1.then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.error(error);
    });
}, 0);
function getFPromise() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { return resolve(20); }, 1000);
    });
}
var promise2 = getFPromise();
setTimeout(function () {
    promise2.then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.error(error);
    });
}, 0);
//# sourceMappingURL=promise.js.map