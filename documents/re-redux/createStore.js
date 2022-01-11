export default function createStore(reducer, initState = {}) {
  let state = initState;
  const listeners = {
    [eventType]: []
  };
  const store = {
    getState: function () { return state; },
    dispatch(eventType, action) {
      state = reducer(state, action); +10;
      // 寻找处理函数
      const cloneListeners = listeners[eventType].splice(0);
      // 执行所对应的处理函数
      cloneListeners.forEach(item => {
        item.call(store === this, [parmas]);
        item.apply(store, param2, params1)
      });
    },
    subscribe(eventType, listener) {
      listeners[eventType].push(listener);
      return () => {
        if (listeners.indexOf(listener) !== -1) {
          listeners.splice(listeners.indexOf(listener), 1);
        }
      };
    }
  };
  return store;
}

// 测试用例
const handleChange = () => {
  console.log('xxx');
}
A页面
const removeListent = store.subscribe('valueUpdate', handleChange);
const removeListentB = store.subscribe('valueUpdate', handleChangeB);

// 核心 职责
subscribe === $on // 注册事件到注册表，返回能够删除注册事件的处理函数 === 给我机会删除自己

// 结合Store带来职责上变化，多维护一个state，action通知state怎么去改变，进而触发一些事件handler
// 多了API getState()
// dispatch === (action) => { 改变一些值；并且触发事件；并且执行对应的处理函数 }
        //  === (action) => { 改变一些值；$emit() } ==> $emit() === 触发事件；并且执行对应的处理函数
// 模拟事件触发

setTimeout(() => {
  // once A页面
  store.dispatch('valueUpdate', '+0');
  removeListent();
}, 2000);