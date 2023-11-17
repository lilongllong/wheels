import React, { useState } from 'react';
import { Button, Divider, Input, Upload } from 'antd';
import { UploadOutlined, DownCircleOutlined } from '@ant-design/icons';
import { linkPageImage, linkPagePdf, downloadFile } from '../../apis/index';

export default function PagePage() {
  const [fileName, setFileName] = useState('');
  return (
    <div>
      <p>puppeteer生成网页截图</p>
      <Button onClick={() => linkPagePdf({ url: 'http://localhost:3001/page' })}>开始生成百度网页</Button>
      <Button onClick={() => linkPageImage({ url: 'https://www.baidu.com' })}>开始生成百度图片</Button>
      <Divider />
      <p>minio上传功能</p>
      <Upload name="file" action="http://127.0.0.1:3000/api/minio/upload">
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Button type="primary" onClick={() => downloadFile({ fileName: 'screenshot_1700207546278.png' })} icon={<DownCircleOutlined />}>Click to download</Button>
      <Divider />
      <div>
        <div><span>输入下载文件</span><Input value={fileName} onChange={(e) => setFileName(e.target.value)} /></div>
        <Button type="primary" onClick={() => downloadFile({ fileName })} icon={<DownCircleOutlined />}>Click to download chinese</Button>
      </div>
    </div>
  );
}
