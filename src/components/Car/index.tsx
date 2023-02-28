import React from 'react';
import { List, Space, Avatar, Divider } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { carData, ICarDetail } from './data';

export default function CarIndex() {
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const renderItem = (item: ICarDetail) => {
    return (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.image} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    );
  }
  return (
    <div className='car-container'>
      <p>推荐车型</p>
      <Divider />
      <div>
        <p className='car-text'>TaildWind.css 的验证</p>
        <button className='bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-30'>Sign up</button>
        <button className='p-6'>自定义</button>
      </div>
      <Divider />
      <List
        itemLayout='vertical'
        size='large'
        dataSource={carData}
        renderItem={renderItem}
        // footer={
        //   <div>
        //     <b>ant design</b> footer part
        //   </div>
        // }
      >
      </List>
    </div>
  );
}
