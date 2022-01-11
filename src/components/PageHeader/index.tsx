/**
 * 设计个通用页面头部
 */
// import React from 'react';
import styles from './style.less';

export type PageHeaderProps = {
  logo: string;
  title: string;
  actions: string[];
};

export default function PageHeader (props: PageHeaderProps) {
  return (
    <div className={styles['wheels-page-header']}>
      标准页面头部
      <p>{ props.title }</p>
      <p>{ props.logo }</p>
      <p>{ props.actions.join(',') }</p>
    </div>
  );
}
