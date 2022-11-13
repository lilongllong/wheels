import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import Counter from './counter';
import Posts from './posts';

export default function ReduxStore () {
  return (
    <Provider store={store}>
      <Counter />
      <Posts />
    </Provider>
  )
}
