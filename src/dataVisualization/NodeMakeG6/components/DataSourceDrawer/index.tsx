import React, { useContext, useState, createContext, useRef } from 'react';
import { Button, Drawer } from 'antd';
import G6, { Graph, GraphData } from '@antv/g6';
import styled from 'styled-components';
import lodash from 'lodash';

import { NodeMakeContext, ENodeMakeActionType } from '@/store/nodeMakeContext';
import { IBranchConfig, EBranchOperation } from '../types/index';
import BranchEditor from '../common/BranchEditor';

interface IProps {
  visible: boolean;
  dataIndex: number | undefined;
  handleVisibleChange: (value?: boolean) => void;
}

const DEFAULT_DATA = {};
const branchConfig: IBranchConfig[] = [{
  key: 'price',
  name: '总价',
  type: 'number',
  defaultValue: 400,
  defaultOperation: EBranchOperation.EQUAL,
}, {
  key: 'unitPrice',
  name: '单价',
  type: 'number',
  defaultValue: 7,
  defaultOperation: EBranchOperation.LESS_THAN,
}, {
  key: 'roomCount',
  name: '户型',
  type: 'number',
  defaultValue: 2,
  defaultOperation: EBranchOperation.MORE_THAN,
}, {
  key: '面积',
  name: 'acreage',
  type: 'number',
  defaultValue: 60,
  defaultOperation: EBranchOperation.MORE_THAN,
}];

export const CommonDataContext = createContext<{ branchConfig: IBranchConfig[] }>({
  branchConfig,
});

const ContentContainer = styled.div`
height: 100%;
`;

const NodeType = 'dataSource-node';

export default function DataSourceEdit(props: IProps) {
  const { visible, handleVisibleChange, dataIndex } = props;
  const { nodes, dispatch, graph, refresh } = useContext(NodeMakeContext);
  const [preNodeMapNodes, setPerNodeMapNodes] = useState({});
  const branchRef = useRef(null);
  /**
     * @painterDrawNode
     */
  const calculateXY = (preNodeID: any, curID: any) => {
    if (preNodeID) {
      const offset = [0, 160, -160, 320, -320, 480, -480];
      const preItem = (graph as Graph).findById(preNodeID);
      const { x = 0, y = 0 } = preItem.getModel();
      if (!preNodeMapNodes[preNodeID]) {
        preNodeMapNodes[preNodeID] = [];
      }
      const count = preNodeMapNodes[preNodeID].length;
      preNodeMapNodes[preNodeID].push(curID);
      const offsetY = offset[count % 7];
      return {
        x: x + 250,
        y: y + offsetY,
      };
    }

    return {
      x: 300,
      y: 300,
    };
  };
  const [data, setData] = useState(dataIndex === undefined ? DEFAULT_DATA : nodes?.[dataIndex]);
  const handleSave = () => {
    const value = (branchRef.current as any)?.getData();
    const type = dataIndex === undefined ? ENodeMakeActionType.ADD : ENodeMakeActionType.UPDTAE;
    if (type === ENodeMakeActionType.ADD) {
      const { x, y } = calculateXY(null, value.id);
      console.log(x,y);
      const id = `datasource_${lodash.uniqueId()}`;
      const node = {
        id,
        type: NodeType,
        x,
        y,
        nodeData: {
          id,
          name: '数据源节点',
          data: {
            question: '问题',
            nodeInfo: value,
          },
        },
      };
      console.log('渲染节点', graph, node);
      graph?.addItem('node', node);
      refresh(id);
    }
    dispatch({ type: dataIndex === undefined ? ENodeMakeActionType.ADD : ENodeMakeActionType.UPDTAE, payload: {
      index: dataIndex,
      nodeData: data,
    } });
  }
  const renderFooter = () => {
    const Footer = styled.div`
      display: flex;
    `;
    return (
      <Footer>
        <Button type='primary' onClick={handleSave}>保存</Button>
        <Button type='default' onClick={() => handleVisibleChange(false)}>取消</Button>
      </Footer>
    );
  };

  return (
    <Drawer
      visible={visible}
      onClose={() => handleVisibleChange(false)}
      footer={renderFooter()}
      width={500}
    >
      <CommonDataContext.Provider value={{ branchConfig }}>
        <ContentContainer>
          <BranchEditor ref={branchRef} value={[]} onChange={() => {}} />
        </ContentContainer>
      </CommonDataContext.Provider>
    </Drawer>
  );
}
