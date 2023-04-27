/**
 * @file: 用来验证CSS的架构设计
 */

import React, { useContext, useState } from 'react';
import { Divider, Button, Card, Col, Input, Row } from 'antd';
import { themeContext, EThemeActionType } from '../../../store/themeContext';
import styles from './index.less';

function DynamicThemeCard() {
  const {dispatch, themeConfig} = useContext(themeContext);
  const [value, setValue] = useState('rgba(0,0,0,.85)');
  return (
    <Card title="浏览器CSS嵌套">
      <Row className="formItem">
        <Col className="formItem--label" span={4}>字体颜色</Col>
        <Col className="formItem--content" span={20}>
          <Input className="formItem--content--input" value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setValue(event.target.value) }} style={{ color: themeConfig.color, width: '300px' }} type='text' />
        </Col>
      </Row>
      <Button onClick={() => dispatch({ type: EThemeActionType.SET, payload: { color: value } }) }>同步字体颜色</Button>
    </Card>
  );
}


export default function CSSArchitecture() {
  return (<div className={styles.cssContainer}>
    <h1>CSS架构相关Demo验证</h1>
    <Divider />
    <DynamicThemeCard />
  </div>);
}
