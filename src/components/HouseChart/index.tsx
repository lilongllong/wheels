import React, {useState, useEffect} from 'react';
import { getHouseList } from './api';

export default function HouseChart() {
  const [salesList, setSalesList] = useState<any>([]); // 成交价
  const [priceList, setPriceList] = useState<any>([]); // 指导价

  useEffect(() => {
    getHouseList().then((res) => {
      console.log(res, 'resss');
      const { data: { sales, prices } } = res;
      setSalesList(sales);
      setPriceList(prices);

    }).catch((error) => {
      console.log(error, 'errrrr');
    })
  }, []);
  return (
    <div>
      <h2>House Chart</h2>
      {(priceList || []).map(item => {
        return (
          <div key={item.id}>{item.id}</div>
        )
      })}
    </div>
  )
}
