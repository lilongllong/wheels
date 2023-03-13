import React from 'react';
import { InputNumber } from 'antd';

import styles from './styles.module.less';

interface IProps {
  value: number[];
  onChange: (value: (number | null)[]) => void;
  label: string;
  unit: string;
}

export default function(props: IProps) {
  const { value, onChange, label, unit } = props;
  return (
    <div className={styles.paramsItem}>
      <label>{label}: </label>
      <div className={styles.itemContent}>
        <InputNumber value={value?.[0]} addonAfter={unit} onChange={(input: number | null) => onChange([input, value?.[1]])}></InputNumber>
        <span className={styles.itemLinker}>~</span>
        <InputNumber value={value?.[1]} addonAfter={unit}  onChange={(input: number | null) => onChange([value?.[0], input])}></InputNumber>
      </div>
    </div>
  )
}
