import characterSizeMap from './characterSizeMap.json';

/**
 * @description 计算单个字符的大小
 * @param {String} c 需要计算的字符
 */
 function calCof(c: string) {
  const size = characterSizeMap[c];
  if (size) {
    return size;
  }
  return 0.5;
}

/**
 * @description 计算一段文本的像素值
 * @param {String} text 需要计算的文本
 * @param {Number} fontSize  字号
 */
 function calculateFontWidth(text: string, fontSize: number, twidth?: number) {
  if (!text) return 0;
  // 字排版：fontGap-每个字之间的间距
  const fontGap = 1;
  let width = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (text.charCodeAt(i) > 0 && text.charCodeAt(i) < 128) {
      // 字排版：0.5-字母以及常见符号占多宽，可以做更细致的控制
      const cof = calCof(text[i]);
      width += (cof * fontSize) + fontGap;
    } else {
      width += fontSize + fontGap;
    }
  }
  return width;
}

// 判断字符是否为回车
function isCR(text: string) {
  if (text.charCodeAt(0) === 10) {
    return true;
  }
  return false;
}

/**
 * @description 将原始文本按照单行最大长度进行分行
 * @param {String} text     原始文本
 * @param {Number} fontSize 字号
 * @param {Number} maxWidth 单行最大宽度
 */
function splitText(text = '', fontSize: number, maxWidth: number) {
  const lines = [];
  let [curWidth, startIndex, i] = [0, 0, 0];
  const contentWidth = maxWidth - (fontSize * 0.2);

  while (i < text.length) {
    if (isCR(text[i])) {
      const tmp = text.slice(startIndex, i);
      startIndex = i + 1;
      curWidth = 0;
      lines.push(tmp);
    }
    curWidth += calculateFontWidth(text[i], fontSize);
    // 字排版：0.2-每一行最右边还剩多少时换行
    if (curWidth > contentWidth) {
      const line = text.slice(startIndex, i + 1);
      startIndex = i + 1;
      curWidth = 0;
      lines.push(line);
    }
    i += 1;
  }
  if (curWidth !== 0) {
    const line = text.slice(startIndex);
    lines.push(line);
  }
  return lines;
}

function getPath(startPoint: { startX: number, startY: number }, endPoint: { endX: number, endY: number }, maxRadius = 20) {
  const { startX, startY } = startPoint;
  const { endX, endY } = endPoint;

  const diffX = Math.abs(startX - endX);
  const diffY = Math.abs(startY - endY);
  const radiusX = diffX / 2;
  const radiusY = diffY / 2;
  const radius = Math.min(radiusX, radiusY) > maxRadius ? maxRadius : Math.min(radiusX, radiusY);
  const middleX = (startX + endX) / 2;
  if ((startX > endX) && (startY > endY)) {
    return [
      ['M', startX, startY],
      ['L', middleX + radius, startY],
      ['A', radius, radius, 0, 0, 1, middleX, startY - radius],
      ['L', middleX, endY + radius],
      ['A', radius, radius, 0, 0, 0, middleX - radius, endY],
      ['L', endX, endY],
    ];
  }
  if ((startX < endX) && (startY < endY)) {
    return [
      ['M', startX, startY],
      ['L', middleX - radius, startY],
      ['A', radius, radius, 0, 0, 1, middleX, startY + radius],
      ['L', middleX, endY - radius],
      ['A', radius, radius, 0, 0, 0, middleX + radius, endY],
      ['L', endX, endY],
    ];
  }
  if ((startX > endX) && (startY < endY)) {
    return [
      ['M', startX, startY],
      ['L', middleX + radius, startY],
      ['A', radius, radius, 0, 0, 0, middleX, startY + radius],
      ['L', middleX, endY - radius],
      ['A', radius, radius, 0, 0, 1, middleX - radius, endY],
      ['L', endX, endY],
    ];
  }
  return [
    ['M', startX, startY],
    ['L', middleX - radius, startY],
    ['A', radius, radius, 0, 0, 0, middleX, startY - radius],
    ['L', middleX, endY + radius],
    ['A', radius, radius, 0, 0, 1, middleX + radius, endY],
    ['L', endX, endY],
  ];
}

export {
  splitText,
  calculateFontWidth,
  getPath,
};
