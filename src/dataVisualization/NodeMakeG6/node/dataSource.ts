/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import NodeFactory from './nodeFactory';
import { splitText } from '../utils';
import nodeLogo from '../assets/multiturn-question-logo.png';
import tipLogo from '../assets/multiturn-tip-logo.png';

class DataSourceNode extends NodeFactory {
  /**
     * @description 绘制content部分的函数
     * @param {*} group
     * @param {Object} nodeData 节点的数据
     * @param {Number} startX 起始位置X坐标
     * @param {Number} startY 起始位置Y坐标
     */
  drawContent(group: any, nodeData: any, startX: number, startY: number) {
    // 初始化要使用的变量
    const { question } = nodeData.data;
    const { textWidth, lineHeight, minContentHeight } = this.headerSizeConfig;
    const heightStart = startY;
    let [cursorX, cursorY] = [startX, startY];
    const { fontSize, fontColor } = this.fontText;
    const questionToShow = question || this.noConfigStyle.placeholder;
    const questionFontColor = question ? fontColor : this.noConfigStyle.fontColor;

    // 逐行分割content的文本
    const lines = splitText(questionToShow, fontSize, textWidth);
    const contentCurHeight = (lines.length * (fontSize + lineHeight)) - lineHeight;
    const contentTooShort = contentCurHeight < minContentHeight;
    if (contentTooShort) {
      cursorY += (minContentHeight - contentCurHeight) / 2;
    }
    cursorX += this.nodePadding.left;
    cursorY += this.nodePadding.top;

    // 绘制content部分的文本
    const currentCursorSite = this.drawText(group, questionToShow, '', this.fontText, cursorX, cursorX, cursorY, questionFontColor, this.basicConfig.maxLines);
    cursorY = currentCursorSite.endY + fontSize + this.nodePadding.bottom;
    if (contentTooShort) {
      cursorY += (minContentHeight - contentCurHeight) / 2;
    }
    const heights = [cursorY - heightStart];

    // 绘制结束后的光标位置和节点各个部分的高度集合
    return {
      startX,
      startY: cursorY,
      heights,
    };
  }

  setState(name: any, value: any, item: any) {
    super.setState(name, value, item);
  }
}

// 节点的个性化配置
const answerStyle = {
  nodeDefaultStyle: {
    tips: '点击配置用户问题',
  },
  activeNodeStyle: {
    stroke: '#4E4E4E',
  },
  titleStyle: {
    fill: '#4E4E4E',
  },
  noConfigStyle: {
    placeholder: '{未配置用户问题}',
  },
};
const logos = {
  nodeLogo, tipLogo,
};
const headerConfig = {
  hasDelete: false, defaultTitle: '用户问题',
};
const utilityFuns = {};
// 新建节点对象,导出节点的生命周期函数
const dataSourceNode = new DataSourceNode(logos, answerStyle, headerConfig, utilityFuns);
export default {
  draw: dataSourceNode.draw.bind(dataSourceNode),
  setState: dataSourceNode.setState.bind(dataSourceNode),
  getAnchorPoints: dataSourceNode.getAnchorPoints.bind(dataSourceNode),
};
