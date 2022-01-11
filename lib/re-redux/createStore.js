"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createStore(reducer, initState) {
    var _a;
    if (initState === void 0) { initState = {}; }
    var state = initState;
    var listeners = (_a = {},
        _a[eventType] = [],
        _a);
    var store = {
        getState: function () { return state; },
        dispatch: function (eventType, action) {
            var _this = this;
            state = reducer(state, action);
            +10;
            // 寻找处理函数
            var cloneListeners = listeners[eventType].splice(0);
            // 执行所对应的处理函数
            cloneListeners.forEach(function (item) {
                item.call(store === _this, [parmas]);
                item.apply(store, param2, params1);
            });
        },
        subscribe: function (eventType, listener) {
            listeners[eventType].push(listener);
            return function () {
                if (listeners.indexOf(listener) !== -1) {
                    listeners.splice(listeners.indexOf(listener), 1);
                }
            };
        }
    };
    return store;
}
exports.default = createStore;
// 测试用例
var handleChange = function () {
    console.log('xxx');
};
A页面;
var removeListent = store.subscribe('valueUpdate', handleChange);
var removeListentB = store.subscribe('valueUpdate', handleChangeB);
// 核心 职责
subscribe === $on; // 注册事件到注册表，返回能够删除注册事件的处理函数 === 给我机会删除自己
// 结合Store带来职责上变化，多维护一个state，action通知state怎么去改变，进而触发一些事件handler
// 多了API getState()
// dispatch === (action) => { 改变一些值；并且触发事件；并且执行对应的处理函数 }
//  === (action) => { 改变一些值；$emit() } ==> $emit() === 触发事件；并且执行对应的处理函数
// 模拟事件触发
setTimeout(function () {
    // once A页面
    store.dispatch('valueUpdate', '+0');
    removeListent();
}, 2000);
//# sourceMappingURL=createStore.js.map