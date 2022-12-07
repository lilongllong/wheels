import React, { FC } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, useParams, useMatch, useNavigate } from 'react-router-dom';

const BreadcrumbContainer: FC<{}> = function() {
  const location = useLocation();
  // const params = useParams();
  // const match = useMatch('/house/shenzhen');
  // const navigate = useNavigate();
  const paths = location.pathname.split('/').filter(item => item.length);
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {paths?.[0] === 'home' && (<Breadcrumb.Item key='1'>家庭工具坊</Breadcrumb.Item>)}
      {paths?.[0] === 'house' && (<Breadcrumb.Item key='2'>购房</Breadcrumb.Item>)}
      {paths?.[0] === 'car' && (<Breadcrumb.Item key='3'>购车</Breadcrumb.Item>)}
      {paths?.[1] === 'shenzhen' && (<Breadcrumb.Item key='4'>深圳购房分析</Breadcrumb.Item>)}
      {paths?.[1] === 'haikou' && (<Breadcrumb.Item key='4'>海口购房分析</Breadcrumb.Item>)}
    </Breadcrumb>
  );
}

export default BreadcrumbContainer;
