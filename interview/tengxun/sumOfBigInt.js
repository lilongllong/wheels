const big1 = '12131231241234';
const big2 = '8128328914819839818293891';

function sumOfBigInt(params1, params2) {
    const arr1 = String(params1).split('');
    const arr2 = String(params2).split('');
    let result = '';
    let enhanceInt = 0;
    while (arr1.length || arr2.length || enhanceInt) {
        const temp = Number(arr1.pop() || 0) + Number(arr2.pop() || 0) + enhanceInt;
        enhanceInt = Math.floor(temp / 10);
        result = String(temp % 10) + result;
    }
    if (result.length === 0) {
        return '0';
    } else {
        console.log(result);
        return result.replace(/^0+/, '');
    }
}
// console.log(sumOfBigInt(big1, big2));
// console.log(sumOfBigInt(1, 99));

// 添加校验
// 事件名必须为字符串
function  Observer() {
    this.eventBus = [];
    // 数组结构 map
    this.handlers = {

    };
    this.listen = function(eventName, handler, isOnce) {
        if (typeof eventName !== 'string') {
            return false;
        }
        this.eventBus.push(eventName);
        if (this.handlers[eventName]) {
            this.handlers[eventName].push({
                handler,
                isOnce
            });
        } else {
            this.handlers[eventName] = [{ handler, limit: isOnce ? 1 : Number.MAX_SAFE_INTEGER }];
        }
        // 返回 remove handler
        return () => { this.remove(eventName, handler); };
    }
    this.trigger = function(eventName) {
        if (typeof eventName === 'string' && this.eventBus.indexOf(eventName) > -1) {
            const targets = this.handlers[eventName] || [];
            // 
            targets.forEach(item => {
                // 不能破坏作用域 将事件本身传回处理函数
                item.handler({ eventName });
                item.limit--;
            });

            targets.forEach(item => {
                if (item.limit <= 0) {
                    this.remove(eventName, item.handler);
                }
            });
            return true;
        }
        return false;
    }
    this.remove = function(eventName, handler) {
        if (typeof eventName === 'string' && this.eventBus.indexOf(eventName) > -1) {
            this.handlers[eventName] = this.handlers[eventName].filter(item => item.handler !== handler);
            if (this.handlers[eventName].length === 0) {
                this.eventBus = this.eventBus.filter(item => item !== eventName);
                delete this.handlers[eventName];
            }
        }
    }
}

// 测试用例
const o = new Observer();
var ourVariable = '测试外部变量';
const handler = (e) => {
    console.log('trigger handler', e.eventName, ourVariable)
};
const removeHandler = o.listen('trigger', handler, true);
o.trigger('trigger');
// removeHandler();
// o.remove('trigger', handler);
o.trigger('trigger');


