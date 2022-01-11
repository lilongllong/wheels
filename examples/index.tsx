import ReactDOM from 'react-dom';
import { PageHeader } from '../src/index';

const renderApp = () => {
  ReactDOM.render(
    <div><PageHeader title="测试" logo="https://www.antdv.com" actions={['a', 'n']} />wabgashjah</div>,
    document.querySelector('#root'),
  );
};

// 单独 App 运行
renderApp();
