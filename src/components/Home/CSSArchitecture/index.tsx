/**
 * @file: 用来验证CSS的架构设计
 */

import React, { useContext, useRef, useState } from 'react';
import { Divider, Button, Card, Col, Input, Row, message } from 'antd';
import classnames from 'classnames';
import styled from 'styled-components';
import { clearFix, ellipsis, between, linearGradient } from 'polished';
import { themeContext, EThemeActionType } from '../../../store/themeContext';
import styles from './index.less';
import './index.css';

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

function SeniorSelectorCard() {
  return (
    <Card title="is、where、not、has选择器的BEM规则展示">
      <div className={styles.demo}>
        <div className={styles.parent1}>
          <p>标签P1</p>
        </div>
        <div className={styles.parent2}>
          <p>标签P2</p>
        </div>
        <div className={styles.parent3}>
          <p>标签P3</p>
        </div>
        <div className={classnames([styles.parent4, styles.notBorder])}>
          <p>标签P4</p>
        </div>
        <div className={classnames([styles.parent4, styles.notBorder])}>
          <h1>标签H5</h1>
        </div>
      </div>
    </Card>
  );
}

function StyledComponentCard() {
  const Title = styled.div`
    ${clearFix()}
    ${ellipsis('450px')}
    font-size: ${between('12px', '20px', '400px', '1000px')};
    ${linearGradient({
      colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
      toDirection: 'to top right',
      fallback: '#FFF',
      })}
  `;
  return (
    <Card title="styled-component、polish.css、tailwind.css组合使用">
      <Title>展示抓取的数据，目的获取关注小区的最新售价，和挂牌价变化范围</Title>
      <div className='font-bold underline'>tailwind.css的应用-加粗下划线</div>
    </Card>
  );
}

function CSSTimer() {
  const [started, setStarted] = useState(false);
  const clockRef = useRef(null);
  const handleTimeStart = () => {
    setStarted(true);
  };
  const handleTimeEnd = () => {
    setStarted(false);
  };
  const handleCurrentTime = () => {
    if (!clockRef.current) {
      message.error('时钟获取失败');
      return;
    }
    const ms = getComputedStyle(clockRef.current).getPropertyValue('--ms');
    const m = getComputedStyle(clockRef.current).getPropertyValue('--m')
    const s = getComputedStyle(clockRef.current).getPropertyValue('--s')
    message.info({
      content: `当前计时: ${m}:${s}:${ms}`,
    });
  }
  return (
    <Card title="CSS 数字时钟">
      <p>css property 数字变化</p>
      <span className='cssTimer'></span>
      <Divider />
      <p>css animation 数字变化</p>
      <div className="clockLayout">
        <span ref={clockRef} className={classnames({ 'animationTimer': true, started: started })}></span>
        <div className="clockAction">
          <Button style={{ marginRight: '4px' }} size="small" type="primary" onClick={handleTimeStart}>开始</Button>
          <Button style={{ marginRight: '4px' }} size="small" type="ghost" onClick={handleTimeEnd}>暂停</Button>
          <Button size="small" type="ghost" onClick={handleCurrentTime}>报时</Button>
        </div>
      </div>
    </Card>
  );
}


export default function CSSArchitecture() {
  return (<div className={styles.cssContainer}>
    <h1>CSS架构相关Demo验证</h1>
    <Divider />
    <DynamicThemeCard />
    <SeniorSelectorCard />
    <StyledComponentCard />
    <CSSTimer />
  </div>);
}
