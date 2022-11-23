import React, {useState, useEffect} from 'react';
import HighCharts from 'highcharts';
import { Select } from 'antd';
import { getHouseList } from './api';
import { IHouse, IPrice, ISale } from './interface';
import { CHART_TYPE, COMMUNITY_LIST } from './constrant';

export default function HouseChart() {
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
    HighCharts.chart('container', {
      title: {
        text: `${district} - 面积和单价走势图`
      },

      yAxis: {
        title: {
          text: 'Unit Price'
        }
      },

      xAxis: {
        title: {
          text: 'area'
        },
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      series: [{
          name: CHART_TYPE.price.name,
          data: pricesData
      },{
        name: CHART_TYPE.sale.name,
        data: salesData,
        type: 'scatter',
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
  }

  return (
    <div>
      <h2>House Chart</h2>
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
