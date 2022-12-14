/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import NodeFactory from './nodeFactory';
import { splitText } from '../utils';
import trashLogo from '../assets/multiturn-trash-logo.png';
import nodeLogo from '../assets/multiturn-answer-logo.png';
import tipLogo from '../assets/multiturn-tip-logo.png';

class ResultNode extends NodeFactory {
  /**
     * @description 绘制content部分的函数
     * @param {*} group
     * @param {Object} nodeData 节点的数据
     * @param {Number} startX 起始位置X坐标
     * @param {Number} startY 起始位置Y坐标
     */
  drawContent(group: any, nodeData: any, startX: number, startY: number) {
    const { type: replyMethod } = nodeData.data;
    // 初始化要使用的变量

    const { textWidth, lineHeight, minContentHeight } = this.headerSizeConfig;
    let [cursorX, cursorY] = [startX, startY];

    let replyContent = undefined;
    replyContent = '引用其他问答引擎';
    // 根据传入的配置确定节点content的样式变量
    const heightStart = startY;
    const { fontSize, fontColor } = this.fontText;
    const answerToShow = replyContent || this.noConfigStyle.placeholder;
    const answerFontColor = replyContent ? fontColor : this.noConfigStyle.fontColor;

    // 逐行分割content的文本
    const lines = splitText(answerToShow, fontSize, textWidth);
    const contentCurHeight = (lines.length * (fontSize + lineHeight)) - lineHeight;
    const contentTooShort = contentCurHeight < minContentHeight;
    if (contentTooShort) {
      cursorY += (minContentHeight - contentCurHeight) / 2;
    }
    cursorX += this.nodePadding.left;
    cursorY += this.nodePadding.top;

    // 绘制content部分的文本
    const currentCursorSite = this.drawText(group, answerToShow, '', this.fontText, cursorX, cursorX, cursorY, answerFontColor, this.basicConfig.maxLines);
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
}

// 判断节点是否为空的函数
function isEmptyNode(nodeData: any) {
  return !nodeData.data[nodeData.data.type].id;
}

// 节点的个性化配置
const answerStyle = {
  nodeDefaultStyle: {
    tips: '点击配置机器人答案',
  },
  activeNodeStyle: {
    stroke: '#1154FF',
  },
  titleStyle: {
    fill: '#1154FF',
  },
  noConfigStyle: {
    placeholder: '{未配置答案}',
  },
};
const logos = {
  trashLogo, nodeLogo, tipLogo,
};
const headerConfig = {
  hasDelete: true, defaultTitle: '机器人答案',
};
const utilityFuns = {
  isEmptyNode,
};
// 新建节点对象,导出节点的生命周期函数
const resultNode = new ResultNode(logos, answerStyle, headerConfig, utilityFuns);
export default {
  draw: resultNode.draw.bind(resultNode),
  setState: resultNode.setState.bind(resultNode),
  getAnchorPoints: resultNode.getAnchorPoints.bind(resultNode),
};
