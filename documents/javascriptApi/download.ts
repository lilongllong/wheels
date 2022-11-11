/**
 * 如何将 json 转换成文件下载
 */

function download(url: string, name: string) {
  const aEle = document.createElement('a');
  aEle.download = name;
  aEle.rel = 'noopener';
  aEle.href = url;
  aEle.click();
  // aEle.dispatchEvent(new MouseEvent('click'));
}

const json = {
  a: 'whitespace  2',
  b: {
    name: '二级结构',
  }
};

function jsonToUrl(json: object) {
  const str = JSON.stringify(json, null, 2);
  const dataUrl = `data:,${str}`;
  download(dataUrl, 'demo.json');

  const ObjectUrl = URL.createObjectURL(new Blob(str.split('')));
  download(ObjectUrl, 'objDemo.json');
}

async function downloadImage(file: File) {
  const getUrl = function(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (ev) => {
        reject(ev);
      };
    });
  };
  const dataUrl = await getUrl(file);
  download(dataUrl, 'fileName');
  const objUrl = URL.createObjectURL(file);
  download(objUrl, 'fileName');
}

export default () => {
  // jsonToUrl(json);
};


