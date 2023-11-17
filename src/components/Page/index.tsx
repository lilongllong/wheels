import React from 'react';
import { Button } from 'antd';
import { linkPageImage, linkPagePdf } from '../../apis/index';

export default function PagePage() {
  return (
    <div>
      <p>puppeteer生成网页截图</p>
      <Button onClick={() => linkPagePdf({ url: 'http://localhost:9000/page' })}>开始生成百度网页</Button>
      <Button onClick={() => linkPageImage({ url: 'https://www.baidu.com' })}>开始生成百度图片</Button>
    </div>
  );
}
