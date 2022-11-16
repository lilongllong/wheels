import React, { useContext } from 'react';
import { ThemeContext } from './index';

export default function ThemeButton ( props ) {
  const { store, dispatch } = useContext(ThemeContext);
  const newTheme = store.theme === 'light' ? 'dark' : 'light';
  return (
    <button style={{backgroundColor: store.color}} onClick={() => dispatch({type: newTheme})}> {store.theme} </button>
  )
}
