import React, { FC, memo, useEffect, useState } from 'react';
import DataSet from '@antv/data-set';
import moment from 'moment';
import { Chart, registerShape, Util } from '@antv/g2'

import { fetchCommunity, IHouseNominalPrice, IHouseSales } from '@/apis/index';
import { extractTags } from '../utils/index';

import styles from './styles.module.less';

function getTextAttrs(cfg: any) {
  return {
    ...cfg.defaultStyle,
    ...cfg.style,
    fontSize: cfg.data.size,
    text: cfg.data.text,
    textAlign: 'center',
    fontFamily: cfg.data.font,
    fill: cfg.color || cfg.defaultStyle.stroke,
    textBaseline: 'Alphabetic'
  }
}

// 给point注册一个词云的shape
registerShape('point', 'cloud', {
  draw(cfg: any, container) {
    const attrs = getTextAttrs(cfg);
    const textShape: any = container.addShape('text', {
      attrs: {
        ...attrs,
        x: cfg.x,
        y: cfg.y
      }
    });
    if (cfg.data.rotate) {
      Util.rotate(textShape, cfg.data.rotate * Math.PI / 180);
    }
    return textShape;
  }
});

const Container: FC<{ params: { name: string } }> = function(props) {
  const [chartInstance, setChartInstance] = useState<Chart>();
  const [lineInstance, setLineInstance] = useState<Chart>();
  const [houseData, setHouseData] = useState<IHouseSales[]>([]);
  const [priceData, setPriceData] = useState<IHouseNominalPrice[]>([]);

  const renderChart = (prices: IHouseNominalPrice[]) => {
    const instance = new Chart({
      container: 'houseCiYun',
      autoFit: true,
      width: 600,
      height: 400,
      padding: 0,
    });
    const data: any[] = extractTags(prices, ['title', 'layout', 'orientation', 'tags', 'changeType'])
    const dv = new DataSet.View().source(data.map(([key, value]) => ({
      x: key,
      value: value,
      category: props.params.name,
    })));
    const range = dv.range('value');
    const min = range[0];
    const max = range[1];
    dv.transform({
      type: 'tag-cloud',
      fields: ['x', 'value'],
      size: [600, 400],
      font: 'Verdana',
      padding: 0,
      timeInterval: 5000, // max execute time
      rotate() {
        let random = ~~(Math.random() * 4) % 4;
        if (random === 2) {
          random = 0;
        }
        return random * 90; // 0, 90, 270
      },
      fontSize(d) {
        if (d.value) {
          return ((d.value - min) / (max - min)) * (80 - 24) + 24;
        }
        return 0;
      }
    });
    instance?.data(dv.rows);
    instance?.scale({
      x: { nice: false },
      y: { nice: false }
    });
    instance?.legend(false);
    instance?.axis(false);
    instance?.tooltip({
      showTitle: false,
      showMarkers: false
    });
    instance?.coordinate()?.reflect(undefined as any);
    instance?.point()
      .position('x*y')
      .shape('cloud')
      .tooltip('value*category');
    instance?.interaction('element-active');
    instance?.render();
    setChartInstance(instance);
  };

  const renderLine = (sales: IHouseSales[]) => {
    const chart = new Chart({
      container: 'houseLine',
      autoFit: true,
      height: 500,
    });

    chart.data(sales.filter(item => item.price > 0));
    chart.scale({
      date: {
        alias: '日期',
        type: 'time',
      },
      price: {
        alias: '总价',
        min: 0,
        formatter: (value) => {
          return `${value} 万元`;
        },
        sync: true, // 将 pv 字段数值同 time 字段数值进行同步
        nice: true,
      },
      unitPrice: {
        alias: '单价',
        formatter: (value) => {
          return `${value} 万元`;
        },
        sync: true,  // 将 pv 字段数值同 time 字段数值进行同步
        nice: true,
      },
      cycle: {
        alias: '去化周期',
        formatter: (value) => {
          return `${value} 月`;
        },
        sync: true,  // 将 pv 字段数值同 time 字段数值进行同步
        nice: true,
      },
      roomCount: {
        alias: '户型',
        formatter: (value) => {
          return `${value} 室`;
        },
        sync: true,  // 将 pv 字段数值同 time 字段数值进行同步
        nice: true,
      },
      acreage: {
        alias: '面积',
        formatter: (value) => {
          return `${value} 平米`;
        },
        sync: true,  // 将 pv 字段数值同 time 字段数值进行同步
        nice: true,
      },
      name: {
        alias: '小区',
        formatter: (value) => {
          return `${value}`;
        },
        sync: true,  // 将 pv 字段数值同 time 字段数值进行同步
        nice: true,
      },
    });

    chart.axis('unitPrice', {
      grid: null,
      title: {},
    });
    chart.axis('price', {
      title: {},
    });

    chart.tooltip({
      showCrosshairs: true,
      showTitle: true,
      showContent: true,
      shared: true,
   });

    chart
      .line()
      .position('date*price')
      .color('#4FAAEB');
    chart
      .line()
      .position('date*unitPrice')
      .color('#9AD681')
      .shape('dash')
      .tooltip('unitPrice*name*cycle*roomCount*acreage');
    chart.render();
  }

  useEffect(() => {
    fetchCommunity({ name: props.params.name }).then((res) => {
      if (res.success) {
        // x value category
        renderChart(res.data.prices);
        const salesData = res.data.sales.sort((a: IHouseSales, b: IHouseSales) => {
          console.log(moment(a.date));
          return moment(b.date).isAfter(moment(a.date)) ? 1 : -1;
        });
        renderLine(salesData);
        setHouseData(salesData);
        setPriceData(res.data.prices);
      }
    });
  }, [props.params.name]);
  return (
    <div className={styles.houseContainer}>
      <div className={styles.featureAnalyze}>
        <p className={styles.title}>特征分析：挂牌数量 {priceData.length}</p>
        <div className={styles.ciyun} id="houseCiYun"></div>
      </div>
      <div className={styles.featureAnalyze}>
        <p className={styles.title}>价格趋势: 历史成交量 {houseData.length}</p>
        <div className={styles.ciyun} id="houseLine"></div>
      </div>
    </div>
  );
}

export default memo(Container);
