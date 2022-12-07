import React, { useState } from 'react';
import FeatureAnalyze from './featureAnalyze/index';
import SearchBar from './searchBar/index';
import FastFindHouse from './FastFindHouse';

export default function HouseIndex() {
  const [searchParams, setSearchParams] = useState<{ name: string }>({ name: '万象新天' });
  return (
    <div className='containaer'>
      <h1>参数设置</h1>
      <SearchBar onChange={(values) => setSearchParams(values)} />
      <h1>挂盘&售卖分析</h1>
      <FeatureAnalyze key={JSON.stringify(searchParams)} params={searchParams} />
      <FastFindHouse />
    </div>
  );
}
