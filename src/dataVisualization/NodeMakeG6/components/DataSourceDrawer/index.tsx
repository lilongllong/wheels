import React, { useContext, useState, createContext, useRef } from 'react';
import { Button, Drawer } from 'antd';
import styled from 'styled-components';

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

export default function DataSourceEdit(props: IProps) {
  const { visible, handleVisibleChange, dataIndex } = props;
  const { nodes, dispatch } = useContext(NodeMakeContext);
  const branchRef = useRef(null);
  const [data, setData] = useState(dataIndex === undefined ? DEFAULT_DATA : nodes?.[dataIndex]);
  const handleSave = () => {
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
  const ContentContainer = styled.div`
    height: 100%;
  `;
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
