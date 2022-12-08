import React, { useState } from 'react';
import { Input, InputNumber, Divider, Button } from 'antd';

import RadarAnalyze from './radar';
import ArrayValueInput from './ArrayValueInput';

import styles from './styles.less';

const FastFindHouse = function() {
  const [price, setPrice] = useState<number[]>([]);
  const [acreage, setAcreage] = useState<number[]>([]);
  const [roomCount, setRoomCount] = useState<number[]>([]);

  const handleFetchData = () => {
    // 根据限制条件，获取对应小区
  }
  return (
    <div className={styles.container}>
      <div className={styles.paramsLayout}>
        <ArrayValueInput key="price" label='总价' unit='万元' value={price} onChange={setPrice} />
        <ArrayValueInput key="acreage" label='面积' unit='平方米' value={acreage} onChange={setAcreage} />
        <ArrayValueInput key="roomCount" label='户型' unit='室' value={roomCount} onChange={setRoomCount} />
        <div className={styles.footer}>
          <Button type='primary' onClick={handleFetchData}>开始搜索</Button>
        </div>
      </div>
      <div className={styles.dataAnalyze}>
        <RadarAnalyze />
      </div>
    </div>
  );
}

export default FastFindHouse;
