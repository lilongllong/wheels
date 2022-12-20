import React from 'react';
import styled from 'styled-components';
import { clearFix, ellipsis } from 'polished';

export default function HouseIndex() {
  const Title = styled.div`
    ${clearFix()}
    ${ellipsis('250px')}
  `;
  return (
    <div className='container'>
      <Title>展示抓取的数据，目的获取关注小区的最新售价，和挂牌价变化范围</Title>
      <div className='font-bold underline'>加粗下划线</div>
    </div>
  );
}
