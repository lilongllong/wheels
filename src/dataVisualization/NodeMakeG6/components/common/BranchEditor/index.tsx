import { slice, update } from 'lodash';
import React, { useState, useMemo, useImperativeHandle, forwardRef } from 'react';
import { IBranchConfig } from '../../types/index';
import BranchItem from './BranchItem';

import styles from './index.module.less';

interface IProps {
  value: IBranchConfig[];
  onChange: (value: IBranchConfig[]) => void;
}

function BranchEditor(props: IProps, ref: any) {
  const [data, setData] = useState<IBranchConfig[]>([]);

  useImperativeHandle(ref, () => ({
    initData(value: IBranchConfig[]) {
      setData(value);
    },
    getData() {
      return data;
    }
  }));

  const handleBranchItemChange = (type: 'update' | 'delete' | 'add', index: number, value: IBranchConfig, ) => {
    switch (type) {
      case 'update': {
        setData([...data.slice(0, index), value, ...data.slice(index+1)])
        break;
      }
      case 'add': {
        setData([...data.slice(0), value]);
        break;
      }
      case 'delete': {
        setData([...data.slice(0, index), ...data.slice(index+1)]);
      }
    }
  }

  const renderBranchItem = (data: IBranchConfig, index: number) => {
    <div key={`${data.key}_${index}`} className={styles.branch_item}>
      <BranchItem value={data} onChange={(value) => handleBranchItemChange('update', index, value)} />
    </div>
  };

  return <div className={styles.branch_editor}>
    {data.map(renderBranchItem)}
	</div>;
}

export default forwardRef(BranchEditor);
