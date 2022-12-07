import React, { Children, FC } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Outlet, useLocation, useParams, useMatch, useNavigate } from 'react-router-dom';

import MenuContainer from './Menu';
import BreadcrumbContainer from './Breadcrumb';
import styles from '../styles/layout.less';

const { Header, Content, Sider }  = Layout;

const PageLayout: FC = (props) => {

  return (
    <Layout className={styles.pageLayout}>
      <Header className={styles.header}>
        <div className='logo'></div>
      </Header>
      <Layout>
        <Sider width={200} style={{ height: '100%' }}>
          <MenuContainer />
        </Sider>
        <Layout style={{ padding: '0 24px 24px', background: '#fff' }}>
          <BreadcrumbContainer />
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
