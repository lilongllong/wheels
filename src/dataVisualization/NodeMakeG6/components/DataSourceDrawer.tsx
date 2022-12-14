import React, { useContext, useState } from 'react';
import { Button, Drawer } from 'antd';
import styled from 'styled-components';

import { NodeMakeContext, ENodeMakeActionType } from '@/store/nodeMakeContext';

interface IProps {
  visible: boolean;
  dataIndex: number | undefined;
  handleVisibleChange: (value?: boolean) => void;
}

const DEFAULT_DATA = {};

export default function DataSourceEdit(props: IProps) {
  const { visible, handleVisibleChange, dataIndex } = props;
  const { nodes, dispatch } = useContext(NodeMakeContext);
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
  return (
    <Drawer
      visible={visible}
      onClose={() => handleVisibleChange(false)}
      footer={renderFooter()}
    >

    </Drawer>
  );
}
