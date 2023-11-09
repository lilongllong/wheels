import React, { FC, useEffect } from 'react';
import styles from './styles/common.less';
import _ from 'lodash';

interface IProps {};

const img2base64 = (imgSrc: string) => {
  if (_.isEmpty(imgSrc)) {
    return null;
  }
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    xhr.onload = ({ target }: { target: any }) => {
      try {
        const url = URL.createObjectURL(target?.response);
        const img = new Image();
        img.onload = () => {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          context?.drawImage(img, 0, 0);
          resolve(canvas.toDataURL());
          URL.revokeObjectURL(url);
        };
        img.onerror = () => {
          resolve(null);
        };
        img.src = url;
      } catch {
        reject();
      }
    };
    xhr.open('GET', imgSrc, true);
    xhr.setRequestHeader('Pragma', 'no-cache');
    xhr.responseType = 'blob';
    xhr.send();
  });
};

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
