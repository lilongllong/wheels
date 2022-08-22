import { useState, useEffect } from 'react';

const createGlobalStore = (initialValue: any) => {
  const listeners = new Set<Function>();
  const state = initialValue;
  const store = new Proxy(state, {
    set(target, propertyKey, value, receiver) {
      Reflect.set(target, propertyKey, value, receiver);
      for (const listener of listeners) {
        listener?.();
      }
      return true;
    },
    get(target, propertyKey, receiver) {
      return Reflect.get(target, propertyKey, receiver);
    }
  });
  const useStore = () => {
    const [, setState] = useState(null);
    useEffect(() => {
      const fn = () => setState({} as any);
      listeners.add(fn);
      return () => { listeners.delete(fn); };
    }, []);
    return store;
  };
  return [store, useStore];
}

export default createGlobalStore;
