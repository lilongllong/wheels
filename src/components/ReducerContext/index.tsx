import React, { useReducer, useMemo, Dispatch } from 'react';
import style from './style.less';
import Toolbar from './Toolbar';

// Context： 在一个父组件里，生命变量，通过 Context 往下传，则下面所有的子组件都可以通过 Context 拿到值，避免了层层传递
// 1、在父组件创建 Context，通过 Provider 往下传
// 2、在需要用该参数的子组件，通过 useContext Hook 拿到
// 3、如果需要在子组件更改参数，则需要在 Provider 那里传更改的函数，然后子组件调用即可
// 4、使用 useReducer 作为 state 的全局管理，适合做中等的全局数据管理

const initialState = {
  theme:'light',
  color: 'red'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'light':
      return {...state, theme: 'light', color:'red'};
    case 'dark':
      return {...state, theme: 'dark'};
    default:
      throw new Error();
  }
}
export const ThemeContext = React.createContext({
  store: initialState,
  dispatch: (() => {}) as Dispatch<any>,
});

export default function ReducerContext ( props ) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.Fragment>
      <div>Reducer Context</div>
      <ThemeContext.Provider value={{ dispatch, store: state }}>
        <Toolbar />
      </ThemeContext.Provider>
    </React.Fragment>
  )
}
