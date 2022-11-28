import React from 'react';

import TestComponent from '../TestComponent';
import PracticeContext from '../PracticeContext';
import ReducerContext from '../ReducerContext';
import WangEditor from '../WangEditor';
import MyBraftEditor from '../MyBraftEditor';
import PageHeader from '../PageHeader/index';
import ReduxStore from '../ReduxStore';

export default function HomeContainer() {
  return (
    <div>
      <PageHeader title="测试" logo="https://www.antdv.com" actions={['a', 'n']} />
        <span>页面标题</span>
        {/* <TestComponent />s */}
        {/* <PracticeContext /> */}
        {/* <ReducerContext /> */}
        {/* <MyBraftEditor /> */}
        <ReduxStore />
    </div>
  );
}
