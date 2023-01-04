import React, { FC, useEffect, useRef, useState } from 'react';

import { Button, Tooltip } from 'antd';
import { MinusCircleFilled, PlusCircleFilled, DragOutlined, DatabaseOutlined, ProfileOutlined } from '@ant-design/icons';
import G6, { Graph, GraphData } from '@antv/g6';
import dataSourceNodeConfig from './node/dataSource';
import resultNodeConfig from './node/result';
import dataSourceEdgeConfig from './edge/dataSource';
import resultEdgeConfig from './edge/result';
import DataSourceDrawer from './components/DataSourceDrawer';
import { NodeMakeWrapper } from '../../store/nodeMakeContext';
import styles from './styles/index.module.less';

enum EDrawerTypes {
  'DATA_SOURCE_DRAWER' = 'DATA_SOURCE_DRAWER',
}

const container: FC<{}> = () => {
  const [graph, setGraph] = useState<Graph>(null as any);
  const [viewState, setViewState] = useState<{ type: EDrawerTypes | undefined; nodesIndex: number | undefined }>({ type: undefined, nodesIndex: undefined });
  const painterRef = useRef(null);

  const handleDrawerVisibleChange = (type?: EDrawerTypes, nodesIndex?: number) => {
    if (type) {
      setViewState({ type, nodesIndex });
    } else {
      setViewState({ type: undefined, nodesIndex: undefined });
    }
  }

  const fetchData = (): Promise<GraphData[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([]);
      }, 300);
    });
  }

  const registerItems = () => {
    G6.registerEdge('dataSource-node-edge', dataSourceEdgeConfig);
    G6.registerEdge('result-node-edge', resultEdgeConfig);
    G6.registerNode('dataSource-node', dataSourceNodeConfig);
    G6.registerNode('result-node', resultNodeConfig)
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

  const initGaphData = async () => {
    const data = await fetchData();
    graph.data(data);
    graph.render();
  }

  useEffect(() => {
    initGraphs();
    registerItems();
    initGaphData();
  }, []);

  const handleZoomControll = (value: { action: string }) => {};

  const changeCanvasOptimize = () => {
    // FIXME 解决canvas拖拽阴影问题：https://github.com/antvis/G6/issues/1519
    const nodeCount = graph.getNodes().length;
    if (nodeCount > 200) {
      graph.get('canvas').set('localRefresh', true);
    } else {
      graph.get('canvas').set('localRefresh', false);
    }
  };

  const refresh = (id: string) => {
    changeCanvasOptimize();
    const item = graph.findById(id);
    graph.focusItem(item);
  }

  return (
    <div className={styles.mainContainer} ref={painterRef} id="controll-tree-container">
      <div className={styles.addBtns}>
        <div className={styles.title}>添加节点</div>
        <Button className={styles.nodeBtn} onClick={() => setViewState({ type: EDrawerTypes.DATA_SOURCE_DRAWER, nodesIndex: undefined })}><DatabaseOutlined />数据源节点</Button>
        <Button className={styles.nodeBtn}>价格过滤节点</Button>
        <Button className={styles.nodeBtn}>面积过滤节点</Button>
        <Button className={styles.nodeBtn}>户型过滤节点</Button>
        <Button className={styles.nodeBtn}>朝向过滤节点</Button>
        <Button className={styles.nodeBtn}><ProfileOutlined />结果节点</Button>
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
      <NodeMakeWrapper value={{ graph: graph, refresh }}>
        <DataSourceDrawer
          dataIndex={viewState.nodesIndex}
          visible={viewState.type === EDrawerTypes.DATA_SOURCE_DRAWER}
          handleVisibleChange={(visible) => handleDrawerVisibleChange(visible ? EDrawerTypes.DATA_SOURCE_DRAWER : undefined, viewState.nodesIndex)}
        />
      </NodeMakeWrapper>
    </div>
  );
};

export default container;
