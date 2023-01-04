import React, {useState, useEffect} from 'react';
import * as echarts from 'echarts';
import { Select } from 'antd';
import { getHouseList } from './api';
import { IHouse, IPrice, ISale } from './interface';
import { CHART_TYPE, COMMUNITY_LIST } from './constrant';

export default function EChartComponent() {
  const [salesList, setSalesList] = useState<ISale[]>([]); // 成交价
  const [priceList, setPriceList] = useState<IPrice[]>([]); // 挂盘价
  const [district, setDistrict] = useState<string>('万象新天'); // 小区

  useEffect(() => {
    getHouseList(district).then((res: any ) => {
      const { data: { sales, prices } } = res;
      const formatSales = (sales || []).filter((item: ISale) => item.unitPrice !== 0 ).sort((a: ISale, b: ISale) => { return a.acreage - b.acreage }).map((item: ISale) => {
        return [item.acreage, item.unitPrice];
      });
      const formatPrices = (prices || []).sort((a: IPrice, b: IPrice) => { return a.acreage - b.acreage }).map((item: IPrice) => {
        return [item.acreage, item.unitPrice];
      })
      setSalesList(formatSales);
      setPriceList(formatPrices);
      painChart(formatPrices, formatSales);
    }).catch((error) => {
      console.log(error, 'errrrr');
    })
  }, [district]);

  const handleChange = (val: string) => {
    setDistrict(val);
  }

  const painChart = (pricesData: any, salesData:any) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('container'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: `${district} - 面积和单价走势图`
      },
      tooltip: {},
      // xAxis: {
      //   data: [50, 60, 70, 80, 90, 100, 110, 120]
      // },
      // yAxis: {
      //   data: [5, 6, 7, 8, 9, 10]
      // },
      series: [{
        name: CHART_TYPE.price.name,
        data: pricesData,
        type: 'line'
        },{
          name: CHART_TYPE.sale.name,
          data: salesData,
          type: 'line'
        }]
    });
  }

  return (
    <div>
      <Select
        defaultValue="万象新天"
        style={{ width: 300 }}
        onChange={handleChange}
        options={COMMUNITY_LIST}
      />
      <div id='container' style={{ width: '100%', height: '100%' }}></div>
    </div>
  )
}
