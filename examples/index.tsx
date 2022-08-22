import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const renderApp = () => {
  ReactDOM.render(
    <App />,
    document.querySelector('#root'),
  );
};

// 单独 App 运行
renderApp();
