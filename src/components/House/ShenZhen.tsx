import React, { useState, useRef } from 'react';
import { Button, Divider, Modal } from 'antd';
import html2canvas from 'html2canvas';
import FeatureAnalyze from './featureAnalyze/index';
import SearchBar from './searchBar/index';
import FastFindHouse from './FastFindHouse';
import styles from './ShenZhen.less';

export default function HouseIndex() {
  const containerRef = useRef(null);
  const [searchParams, setSearchParams] = useState<{ name: string }>({ name: '万象新天' });
  const [previewOpenUrl, setPreviewOpenUrl] = useState<string | undefined>(undefined);
  const handleSnapShot = () => {
    if (containerRef.current) {
      html2canvas(containerRef.current, { ignoreElements: (element: Element) => {
        return element.tagName === 'button';
      } }).then((canvas) => {
        const imgBase64 = canvas.toDataURL();
        setPreviewOpenUrl(imgBase64);
      });
    }
  }
  return (
    <div className={styles} ref={containerRef} style={{  }} className='container'>
      <h1 style={{ marginTop: '16px', fontSize: '24px' }}>
        参数设置
        <Button style={{ float: 'right' }} onClick={handleSnapShot}>生成截图</Button>
      </h1>
      <Divider />
      <SearchBar onChange={(values) => setSearchParams(values)} />
      <h1 style={{ marginTop: '16px', fontSize: '24px' }}>挂盘&售卖分析</h1>
      <Divider />
      <FeatureAnalyze key={JSON.stringify(searchParams)} params={searchParams} />
      <h1 style={{ marginTop: '16px', fontSize: '24px' }}>快速定位合适小区</h1>
      <Divider />
      <FastFindHouse />
      <Modal
        title="html2canvas预览图"
        open={Boolean(previewOpenUrl)}
        onCancel={() => setPreviewOpenUrl(undefined)}
        wrapClassName={styles.previewModal}
      >
        <img className={styles.previewImg} src={previewOpenUrl} />
      </Modal>
    </div>
  );
}
