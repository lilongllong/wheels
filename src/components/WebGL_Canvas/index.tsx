import React, { FC } from 'react';
import styles from './styles/common.less';

interface IProps {};

const Container: FC<IProps> = function(props) {
  return (
    <div className={styles.rootContainer}></div>
  );
}

export default Container;
