import React, { } from 'react';
import { Button } from 'antd';
// import styled from 'styled-components';

import CSSArchitecture from './CSSArchitecture';
// import TestComponent from '../TestComponent';
// import PracticeContext from '../PracticeContext';
// import ReducerContext from '../ReducerContext';
// import WangEditor from '../WangEditor';
// import MyBraftEditor from '../MyBraftEditor';
// import PageHeader from '../PageHeader/index';
// import ReduxStore from '../ReduxStore';

export type HomeProps = {
  name: string;
};

export default function HomeContainer(props: HomeProps) {

  return (
    <div>
      <h1>欢迎{props.name}!</h1>
      <CSSArchitecture />
      {/* <PageHeader title="测试" logo="https://www.antdv.com" actions={['a', 'n']} /> */}
        {/* <span>页面标题</span> */}
        {/* <TestComponent />s */}
        {/* <PracticeContext /> */}
        {/* <ReducerContext /> */}
        {/* <MyBraftEditor /> */}
        {/* <ReduxStore /> */}
    </div>
  );
}
