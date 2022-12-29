import React, { useState } from 'react';
import { Divider } from 'antd';
import FeatureAnalyze from './featureAnalyze/index';
import SearchBar from './searchBar/index';
import FastFindHouse from './FastFindHouse';

export default function HouseIndex() {
  const [searchParams, setSearchParams] = useState<{ name: string }>({ name: '万象新天' });
  return (
    <div style={{ overflowY: 'auto', height: '100%' }} className='container'>
      <h1 style={{ marginTop: '16px', fontSize: '24px' }}>参数设置</h1>
      <Divider />
      <SearchBar onChange={(values) => setSearchParams(values)} />
      <h1 style={{ marginTop: '16px', fontSize: '24px' }}>挂盘&售卖分析</h1>
      <Divider />
      <FeatureAnalyze key={JSON.stringify(searchParams)} params={searchParams} />
      <h1 style={{ marginTop: '16px', fontSize: '24px' }}>快速定位合适小区</h1>
      <Divider />
      <FastFindHouse />
    </div>
  );
}
