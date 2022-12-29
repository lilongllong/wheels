import React, { useState } from 'react';
import { Input, InputNumber, Divider, Button, message } from 'antd';
import { filterSaleInfoByParams, IHouseSales } from '@/apis/index';

import RadarAnalyze from './Radar';
import ArrayValueInput from './ArrayValueInput';
import SaleTable from './SaleTable';

import styles from './styles.module.less';

const FastFindHouse = function() {
  const [price, setPrice] = useState<number[]>([400, 500]);
  const [acreage, setAcreage] = useState<number[]>([60, 90]);
  const [roomCount, setRoomCount] = useState<number[]>([2, 4]);
  const [unitPrice, setUnitPrice] = useState<number[]>([]);
  const [data, setData] = useState<IHouseSales[]>([]);

  const handleFetchData = async () => {
    // 根据限制条件，获取对应小区
    const res = await filterSaleInfoByParams({
      price: price.filter(item => item !== undefined),
      acreage: acreage.filter(item => item !== undefined),
      roomCount: roomCount.filter(item => item !== undefined),
      unitPrice: unitPrice.filter(item => item !== undefined),
    });
    if (res.success) {
      setData(res.data || []);
    } else {
      message.error('查询数据失败');
    }
    console.log(res);
  }
  return (
    <div className={styles.container}>
      <div className={styles.paramsLayout}>
        <ArrayValueInput key="price" label='总价' unit='万元' value={price} onChange={setPrice} />
        <ArrayValueInput key="acreage" label='面积' unit='平方米' value={acreage} onChange={setAcreage} />
        <ArrayValueInput key="unitPrice" label='单价' unit='万元' value={unitPrice} onChange={setUnitPrice} />
        <ArrayValueInput key="roomCount" label='户型' unit='室' value={roomCount} onChange={setRoomCount} />
        <div className={styles.footer}>
          <Button type='primary' onClick={handleFetchData}>开始搜索</Button>
        </div>
      </div>
      <div className={styles.dataAnalyze}>
        <SaleTable data={data} onAction={() => {}} />
        <RadarAnalyze />
      </div>
    </div>
  );
}

export default FastFindHouse;
