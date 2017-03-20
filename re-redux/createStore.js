export default function createStore(reducer, initState = {}) {
  let state = initState;
  const listeners = [];
  const store = {
    getState() { return state; },
    dispatch(action) {
      state = reducer(state, action);
      const cloneListeners = listeners.splice(0);
      cloneListeners.forEach(item => {
        item.call(store)；
      });
    },
    subscribe(listener) {
      listeners.push(listener);
      return () => {
        if (listeners.indexOf(listener) !== -1) {
          listeners.splice(listeners.indexOf(listener), 1);
        }
      };
    }
  };
  return store;
}
