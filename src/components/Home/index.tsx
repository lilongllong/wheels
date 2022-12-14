import React, { useContext } from 'react';
import styled from 'styled-components';

import TestComponent from '../TestComponent';
import PracticeContext from '../PracticeContext';
import ReducerContext from '../ReducerContext';
import WangEditor from '../WangEditor';
import MyBraftEditor from '../MyBraftEditor';
import PageHeader from '../PageHeader/index';
import ReduxStore from '../ReduxStore';
import { themeContext, EThemeActionType } from '../../store/themeContext';
import { Button } from 'antd';

export default function HomeContainer() {
  const { dispatch, themeConfig } = useContext(themeContext);

  return (
    <div>
      <PageHeader title="测试" logo="https://www.antdv.com" actions={['a', 'n']} />
        {/* <span>页面标题</span> */}
        {/* <TestComponent />s */}
        {/* <PracticeContext /> */}
        {/* <ReducerContext /> */}
        {/* <MyBraftEditor /> */}
        {/* <ReduxStore /> */}
        <Button onClick={() => { dispatch({ type: EThemeActionType.SET, payload: { color: 'red' } }) }}>设置红色字体</Button>
    </div>
  );
}
