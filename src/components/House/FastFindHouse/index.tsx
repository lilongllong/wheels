import React from 'react';
import { Input, InputNumber } from 'antd';

import RadarAnalyze from './radar';

import styles from './styles.less';

const FastFindHouse = function() {
  return (
    <div className={styles.container}>
      <h1>根据小区成交价，户型，面积进行小区筛选</h1>
      <div className={styles.paramsLayout}>
        <div className={styles.paramsItem}>
          <label>总价</label>
          <div className={styles.itemContent}>
            <InputNumber addonAfter="万元"></InputNumber>
             ～
            <InputNumber addonAfter="万元"></InputNumber>
          </div>
        </div>
        <div className={styles.paramsItem}>
          <label>面积</label>
          <div className={styles.itemContent}>
            <InputNumber addonAfter="平方米"></InputNumber>
             ～
            <InputNumber addonAfter="平方米"></InputNumber>
          </div>
        </div>
        <div className={styles.paramsItem}>
          <label>户型</label>
          <div className={styles.itemContent}>
            <InputNumber min={1} max={4} addonAfter="室"></InputNumber>
             ～
            <InputNumber min={1} max={4} addonAfter="室"></InputNumber>
          </div>
        </div>
      </div>
      <div className={styles.dataAnalyze}>
        <RadarAnalyze />
      </div>
    </div>
  );
}

export default FastFindHouse;
