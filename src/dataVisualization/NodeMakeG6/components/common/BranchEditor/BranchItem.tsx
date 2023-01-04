import React, { useContext, useState, useMemo, useEffect, useRef } from 'react';
import { Input, Select, InputNumber } from 'antd';
import { IBranchConfig, EBranchOperation } from '../../types/index';
import { CommonDataContext } from '../../DataSourceDrawer/index';
import styled from 'styled-components';
import { hideVisually } from 'polished';

interface IProps {
  value: IBranchConfig,
  onChange: (value: IBranchConfig) => void;
}

const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
`;

export default function BranchItem(props: IProps) {
  const { value, onChange } = props;
  const { branchConfig } = useContext(CommonDataContext);
  const [paramsKey, setParamsKey] = useState<string>(value.key);
  const [paramsOperation, setParamsOperation] = useState<EBranchOperation>(value.defaultOperation || EBranchOperation.EQUAL);
  const [paramsValue, setParamsValue] = useState<any>(value.defaultValue);
  const [paramsNumberValue, setParamsNumberValue] = useState<any>(value.defaultValue);
  const paramsValueRef = useRef(null);
  const paramsNumberValueRef = useRef(null);
  const operationOptions = [
    {
      value: EBranchOperation.EQUAL,
      label: '等于',
    },
    {
      value: EBranchOperation.NOT_EQUAL,
      label: '不等于',
    },
    {
      value: EBranchOperation.LESS_THAN,
      label: '小于',
    },
    {
      value: EBranchOperation.MORE_THAN,
      label: '大于',
    }
  ];
  const targetBranchInfo = useMemo(() => {
    return branchConfig.find((item) => item.key === paramsKey);
  }, [paramsKey, branchConfig]);
  const updateValue = (value: any) => {
    onChange({
      key: paramsKey || '',
      name: targetBranchInfo?.name || '',
      type: targetBranchInfo?.type || 'string',
      defaultOperation: paramsOperation,
      defaultValue: targetBranchInfo?.type === 'number' ? paramsNumberValue : paramsValue,
      ...value,
    });
  };



  const inputHideStyle = hideVisually();
  return (
    <Container>
      <Select
        showSearch
        style={{ width: '120px', marginRight: '12px' }}
        value={paramsKey}
        onChange={(value: string) => {
          setParamsKey(value);
          updateValue({ key: value });
        }}
        options={branchConfig.map((item: IBranchConfig) => ({ value: item.key, label: item.name }))}
      />
      <Select
        value={paramsOperation}
        style={{ width: '120px', marginRight: '12px' }}
        options={operationOptions}
        onChange={(value: EBranchOperation) => {
          setParamsOperation(value);
          updateValue({ defaultOperation: value });
        }}
      />
      <InputNumber
        style={targetBranchInfo?.type === 'number' ? {} : inputHideStyle}
        width={200}
        value={paramsNumberValue}
        ref={paramsValueRef}
        onChange={(value) => {
          setParamsNumberValue(value);
          updateValue({ defaultValue: value });
          console.log(1);
          // (paramsNumberValueRef?.current as any)?.focus?.();
        }}
      />
      <Input
        style={targetBranchInfo?.type === 'number' ? inputHideStyle : {}}
        width={200}
        value={paramsValue}
        ref={paramsNumberValueRef}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setParamsValue(event.target.value);
          updateValue({ defaultValue: event.target.value });
          // (paramsValueRef?.current as any)?.focus?.();
        }}
      />
    </Container>
  );
}
