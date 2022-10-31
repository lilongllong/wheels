import React from 'react';
import { PageHeader } from '../src/index';
import TestComponent from '../src/components/TestComponent';
import PracticeContext from '../src/components/PracticeContext';
import RichText from '../src/components/RichText';

export default () => {
  return (
    <div>
      <PageHeader title="测试" logo="https://www.antdv.com" actions={['a', 'n']} />
      <span>页面标题</span>
      {/* <TestComponent />s */}
      {/* <PracticeContext /> */}
      <RichText />
    </div>
  );
};
