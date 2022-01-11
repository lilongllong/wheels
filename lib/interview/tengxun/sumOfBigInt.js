"use strict";
var big1 = '12131231241234';
var big2 = '8128328914819839818293891';
function sumOfBigInt(params1, params2) {
    var arr1 = String(params1).split('');
    var arr2 = String(params2).split('');
    var result = '';
    var enhanceInt = 0;
    while (arr1.length || arr2.length || enhanceInt) {
        var temp = Number(arr1.pop() || 0) + Number(arr2.pop() || 0) + enhanceInt;
        enhanceInt = Math.floor(temp / 10);
        result = String(temp % 10) + result;
    }
    if (result.length === 0) {
        return '0';
    }
    else {
        console.log(result);
        return result.replace(/^0+/, '');
    }
}
// console.log(sumOfBigInt(big1, big2));
// console.log(sumOfBigInt(1, 99));
// 添加校验
// 事件名必须为字符串
function Observer() {
    this.eventBus = [];
    // 数组结构 map
    this.handlers = {};
    this.listen = function (eventName, handler, isOnce) {
        var _this = this;
        if (typeof eventName !== 'string') {
            return false;
        }
        this.eventBus.push(eventName);
        if (this.handlers[eventName]) {
            this.handlers[eventName].push({
                handler: handler,
                isOnce: isOnce
            });
        }
        else {
            this.handlers[eventName] = [{ handler: handler, limit: isOnce ? 1 : Number.MAX_SAFE_INTEGER }];
        }
        // 返回 remove handler
        return function () { _this.remove(eventName, handler); };
    };
    this.trigger = function (eventName) {
        var _this = this;
        if (typeof eventName === 'string' && this.eventBus.indexOf(eventName) > -1) {
            var targets = this.handlers[eventName] || [];
            // 
            targets.forEach(function (item) {
                // 不能破坏作用域 将事件本身传回处理函数
                item.handler({ eventName: eventName });
                item.limit--;
            });
            targets.forEach(function (item) {
                if (item.limit <= 0) {
                    _this.remove(eventName, item.handler);
                }
            });
            return true;
        }
        return false;
    };
    this.remove = function (eventName, handler) {
        if (typeof eventName === 'string' && this.eventBus.indexOf(eventName) > -1) {
            this.handlers[eventName] = this.handlers[eventName].filter(function (item) { return item.handler !== handler; });
            if (this.handlers[eventName].length === 0) {
                this.eventBus = this.eventBus.filter(function (item) { return item !== eventName; });
                delete this.handlers[eventName];
            }
        }
    };
}
// 测试用例
var o = new Observer();
var ourVariable = '测试外部变量';
var handler = function (e) {
    console.log('trigger handler', e.eventName, ourVariable);
};
var removeHandler = o.listen('trigger', handler, true);
o.trigger('trigger');
// removeHandler();
// o.remove('trigger', handler);
o.trigger('trigger');
//# sourceMappingURL=sumOfBigInt.js.map