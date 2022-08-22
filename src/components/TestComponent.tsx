import React from 'react';
import createGlobalStore from '../store';

const [store, useStore] = createGlobalStore({ count: 0 });

const Counter = () => {
  const store = useStore();
  return (
    <div
      onClick={() => {
        store.count += 1;
      }}
    >
      {store.count}
    </div>
  );
};

export default function storeView() {
  const store = useStore();
  return (
    <div className="App">
      <Counter></Counter>
      {store.count}
    </div>
  );
}
