import React, { FC, useEffect } from 'react';
import styles from './styles/common.less';

interface IProps {};

const Container: FC<IProps> = function(props) {
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (canvas) {

      const ctx = canvas.getContext('2d')
    }
    console.log();
  }, []);
  return (
    <div className={styles.rootContainer}>
      <p>Canvas绘制学习DEMO</p>
      <canvas id='canvas'></canvas>
    </div>
  );
}

export default Container;
