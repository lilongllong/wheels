import React, { useState } from 'react';
import style from './style.less';
import Toolbar from './Toolbar';

// Context： 在一个父组件里，生命变量，通过 Context 往下传，则下面所有的子组件都可以通过 Context 拿到值，避免了层层传递
// 1、在父组件创建 Context，通过 Provider 往下传
// 2、在需要用该参数的子组件，通过 useContext Hook 拿到
// 3、如果需要在子组件更改参数，则需要在 Provider 那里传更改的函数，然后子组件调用即可

const theme = 'light'
export const ThemeContext = React.createContext(theme);
export default function PracticeContext ( props ) {
  const [newTheme, setNewTheme] = useState(theme);

  const changeTheme = () => {
    const temp = newTheme === theme ? 'dark' : 'light';
    setNewTheme(temp);
  }
  return (
    <React.Fragment>
      <div>Practice Context</div>
      <button onClick={changeTheme}>{newTheme}</button>
      <ThemeContext.Provider value={{theme: newTheme, updateTheme: setNewTheme}}>
        <Toolbar />
      </ThemeContext.Provider>
    </React.Fragment>
  )
}
