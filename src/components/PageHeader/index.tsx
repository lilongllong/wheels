/**
 * 设计个通用页面头部
 */
import React from 'react';

import styles from './style.less';

export default function PageHeader (): React.ReactNode {
  return (
    <div className={styles['wheels-page-header']}>
      标准页面头部
    </div>
  );
}
