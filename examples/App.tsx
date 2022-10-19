import React from 'react';
import { PageHeader } from '../src/index';
import TestComponent from '../src/components/TestComponent';
import PracticeContext from '../src/components/PracticeContext';

export default () => {
  return (
    <div>
      <PageHeader title="测试" logo="https://www.antdv.com" actions={['a', 'n']} />
      <span>页面标题</span>
      {/* <TestComponent />s */}
      <PracticeContext />
    </div>
  );
};
