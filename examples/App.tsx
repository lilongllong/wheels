import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { PageHeader } from '../src/index';
import TestComponent from '../src/components/TestComponent';
import demoFunc from '../documents/javascriptApi/download';
import PracticeContext from '../src/components/PracticeContext';
import ReducerContext from '../src/components/ReducerContext';
import WangEditor from '../src/components/WangEditor';
import MyBraftEditor from '../src/components/MyBraftEditor';
import ReduxStore from '../src/components/ReduxStore';
import HouseChart from '../src/components/HouseChart';
import PageLayout from './layout/index';
import { routes } from './config/router';
import 'antd/dist/antd.min.css';
import './styles/app.less';

export default () => {
  useEffect(() => {
    demoFunc();
  }, []);
  const element = useRoutes(routes);
  return (
    <div className='app' >
      {element}
    </div>
  );
};
