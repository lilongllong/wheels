import React, { useContext, useState, useMemo } from 'react';
import { Input, Select, InputNumber } from 'antd';
import { IBranchConfig, EBranchOperation } from '../../types/index';
import { CommonDataContext } from '../../DataSourceDrawer/index';

interface IProps {
  value: IBranchConfig,
  onChange: (value: IBranchConfig) => void;
}

export default function BranchItem(props: IProps) {
  const { branchConfig } = useContext(CommonDataContext);
  const [paramsKey, setParamsKey] = useState<string>();
  const [paramsOperation, setParamsOperation] = useState<EBranchOperation>();
  const [paramsValue, setParamsValue] = useState<any>();
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

  return (
    <div>
      <Select
        showSearch
        value={paramsKey}
        onChange={(value: string) => setParamsKey(value)}
        options={branchConfig.map((item: IBranchConfig) => ({ value: item.key, label: item.name }))}
      />
      <Select
        value={paramsOperation}
        options={operationOptions}
        onChange={(value: EBranchOperation) => setParamsOperation(value)}
      />
      {
        targetBranchInfo?.type === 'number' ? <InputNumber value={paramsValue} onChange={(value) => setParamsValue(value)}></InputNumber> :
        <Input value={String(paramsValue)} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setParamsValue(event.target.value)} />
      }
    </div>
  );
}
