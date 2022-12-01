import React, { FC, useEffect, useRef, useState } from 'react';

import { Button, Tooltip } from 'antd';
import { MinusCircleFilled, PlusCircleFilled, DragOutlined } from '@ant-design/icons';
import G6, { Graph } from '@antv/g6';
import styles from './styles/index.less';

const container: FC<{}> = () => {
  const [graph, setGraph] = useState<Graph>(null as any);
  const painterRef = useRef(null);

  const registerItems = () => {

  }

  const initGraphs = () => {
    const minimap = new G6.Minimap({
      container: 'minimap',
      size: [200, 100],
    });
    const painterHeight = (painterRef.current as any)?.offsetHeight;
    const painterWidth = (painterRef.current as any)?.offsetWidth;

    const graphInstance = new G6.Graph({
      container: 'controll-tree-container',
      width: painterWidth,
      height: painterHeight,
      fitView: true,
      modes: {

      },
      groupByTypes: false,
      minZoom: 0.1,
      maxZoom: 1,
      plugins: [minimap],
      renderer: 'canvas',
    });
    setGraph(graphInstance);
  };

  useEffect(() => {

  }, []);

  const handleZoomControll = (value: { action: string }) => {};

  return (
    <div className={styles.mainContainer} ref={painterRef} id="controll-tree-container">
      <div className={styles.addBtns}>
        <div className={styles.title}>添加节点</div>
        <div className={styles.label}>因素节点</div>
        <Button className={styles.nodeBtn}>价格过滤节点</Button>
        <Button className={styles.nodeBtn}>面积过滤节点</Button>
        <Button className={styles.nodeBtn}>户型过滤节点</Button>
        <Button className={styles.nodeBtn}>朝向过滤节点</Button>
      </div>
      <div className={styles.zoomControll}>
        <div className={styles.zoomRate}>
          <MinusCircleFilled onClick={() => handleZoomControll({ action: 'zoom-in' })} />
          <PlusCircleFilled onClick={() => handleZoomControll({ action: 'zoom-out' })} />
        </div>
        <Tooltip placement='top' title="定位问题节点">
          <DragOutlined onClick={() => handleZoomControll({ action:'zoom-center' })} />
        </Tooltip>
      </div>
      <div id="minimap"></div>
    </div>
  );
};

export default container;
