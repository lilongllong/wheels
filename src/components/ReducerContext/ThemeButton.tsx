import React, { useContext } from 'react';
import { ThemeContext } from './index';

export default function ThemeButton ( props ) {
  const [state, dispatch] = useContext(ThemeContext);
  const newTheme = state.theme === 'light' ? 'dark' : 'light';
  return (
    <button style={{backgroundColor: state.color}} onClick={() => dispatch({type: newTheme})}> {state.theme} </button>
  )
}
