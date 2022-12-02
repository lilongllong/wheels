import React, { FC, memo, useEffect, useState } from 'react';
import DataSet from '@antv/data-set';
import { Chart, registerShape, Util } from '@antv/g2'

import { fetchCommunity } from '@/apis/index';

import styles from './styles.less';

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

const Container: FC = function() {
  const [chartInstance, setChartInstance] = useState<Chart>();
  useEffect(() => {
    const instance = new Chart({
      container: 'houseCiYun',
      autoFit: true,
      padding: 0,
    });
    fetchCommunity({ name: '万象新天' }).then((res) => {
      console.log(res);
      if (res.status === 200 && res.data.code === 0) {
        const dv = new DataSet.View().source(res.data.data);
        const range = dv.range('value');
        const min = range[0];
        const max = range[1];
        dv.transform({
          type: 'tag-cloud',
          fields: ['x', 'value'],
          size: [600, 500],
          font: 'Verdana',
          padding: 0,
          timeInterval: 5000, // max execute time
          // rotate() {
          //   let random = ~~(Math.random() * 4) % 4;
          //   if (random === 2) {
          //     random = 0;
          //   }
          //   return random * 90; // 0, 90, 270
          // },
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
        instance?.coordinate()?.reflect('x');
        instance?.point()
          .position('x*y')
          .color('CornflowerBlue')
          .shape('cloud')
          .tooltip('value*category');
        instance?.interaction('element-active');
        instance?.render();
        setChartInstance(instance);
      }
    });
  }, []);
  return (
    <div className={styles.houseContainer}>
      <div className={styles.featureAnalyze}>
        <p className={styles.title}>特征分析</p>
        <div className={styles.ciyun} id="houseCiYun"></div>
      </div>
    </div>
  );
}

export default memo(Container);
