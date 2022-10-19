import React, { useContext } from 'react';
import { ThemeContext } from './index';

export default function ThemeButton ( props ) {
  const themeProps = useContext(ThemeContext);
  const {theme, updateTheme} = themeProps;
  return (
    <button onClick={() => updateTheme('blue')}> {theme} </button>
  )
}
