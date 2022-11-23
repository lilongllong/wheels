import React, { useEffect } from 'react';
import { PageHeader } from '../src/index';
import TestComponent from '../src/components/TestComponent';
import demoFunc from '../documents/javascriptApi/download';
import PracticeContext from '../src/components/PracticeContext';
import ReducerContext from '../src/components/ReducerContext';
import WangEditor from '../src/components/WangEditor';
import MyBraftEditor from '../src/components/MyBraftEditor';
import ReduxStore from '../src/components/ReduxStore';
import HouseChart from '../src/components/HouseChart';
import 'antd/dist/antd.min.css';

export default () => {
  useEffect(() => {
    demoFunc();
  }, []);
  return (
    <div>
      {/* <PageHeader title="测试" logo="https://www.antdv.com" actions={['a', 'n']} /> */}
      {/* <span>页面标题</span> */}
      {/* <TestComponent />s */}
      {/* <PracticeContext /> */}
      {/* <ReducerContext /> */}
      {/* <MyBraftEditor /> */}
      {/* <ReduxStore /> */}
      <HouseChart />
    </div>
  );
};
