import React, { useContext, useState, useMemo, useEffect } from 'react';
import { Input, Select, InputNumber } from 'antd';
import { IBranchConfig, EBranchOperation } from '../../types/index';
import { CommonDataContext } from '../../DataSourceDrawer/index';
import styled from 'styled-components';

interface IProps {
  value: IBranchConfig,
  onChange: (value: IBranchConfig) => void;
}

export default function BranchItem(props: IProps) {
  const { value, onChange } = props;
  const { branchConfig } = useContext(CommonDataContext);
  const [paramsKey, setParamsKey] = useState<string>(value.key);
  const [paramsOperation, setParamsOperation] = useState<EBranchOperation>(value.defaultOperation || EBranchOperation.EQUAL);
  const [paramsValue, setParamsValue] = useState<any>(value.defaultValue);
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
  useEffect(() => {
    onChange({
      key: paramsKey || '',
      name: targetBranchInfo?.name || '',
      type: targetBranchInfo?.type || 'string',
      defaultOperation: paramsOperation,
      defaultValue: paramsValue,
    });
  }, [paramsKey, paramsOperation, paramsValue]);

  const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  `;
  return (
    <Container>
      <Select
        showSearch
        style={{ width: '120px', marginRight: '12px' }}
        value={paramsKey}
        onChange={(value: string) => setParamsKey(value)}
        options={branchConfig.map((item: IBranchConfig) => ({ value: item.key, label: item.name }))}
      />
      <Select
        value={paramsOperation}
        style={{ width: '120px', marginRight: '12px' }}
        options={operationOptions}
        onChange={(value: EBranchOperation) => setParamsOperation(value)}
      />
      {
        targetBranchInfo?.type === 'number' ? <InputNumber width={120} value={paramsValue} onChange={(value) => setParamsValue(value)}></InputNumber> :
        <Input width={200} value={String(paramsValue)} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setParamsValue(event.target.value)} />
      }
    </Container>
  );
}
