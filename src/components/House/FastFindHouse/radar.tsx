import React, { useContext } from 'react';
import styled from 'styled-components';
import { themeContext, IThemeConfig} from '../../../store/context';

export default function() {
  const { themeConfig, dispatch } = useContext(themeContext);
  const Title = styled.h1`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
    color: ${themeConfig.color}
  `
  return (
    <div>
      <Title>展示每个小区的匹配雷达图</Title>
      <div>主要展示交通，新旧，配套，检索符合度，学区等维度进行分析，需要相关的爬虫和算法支持</div>
    </div>
  );
}
