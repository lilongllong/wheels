import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import Counter from './Counter';

export default function ReduxStore () {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}
