import {  } from '@antv/g6';

import warnningImg from '../assets/multiturn-tip-warning-logo.png';
import trashLogo from '../assets/multiturn-trash-logo.png';
import nodeLogo from '../assets/multiturn-answer-logo.png';
import tipLogo from '../assets/multiturn-tip-logo.png';

import { splitText, calculateFontWidth } from '../utils/index';

class NodeFactory {
  basicConfig = {
    nodeWidth: 200, // 节点宽度
    textBaseline: 'hanging', // 设置在绘制文本时使用的当前文本基线
    maxLines: 4, // 文本最大行数
  };

  nodeDefaultStyle = { // 默认节点的样式
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'PingFang SC',
    fontColor: '#9B9B9B',
    tips: '点击配置机器人询问',
    defaultHeight: 100,
  };

  noConfigStyle = { // 无参数时的配置
    fontColor: '#9B9B9B',
    placeholder: '{未配置}',
  };

  deactiveNodeStyle = { // 未被选中的节点的样式
    fill: 'white',
    fillOpacity: 1,
    radius: 8,
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowBlur: 8,
    shadowOffsetX: 0,
    shadowOffsetY: 4,
    lineWidth: undefined,
    stroke: undefined,
  };

  activeNodeStyle = { // 被选中的节点的样式
    stroke: '#FFAB08',
    fill: 'white',
    lineWidth: 2,
    fillOpacity: 1,
    radius: 8,
  };

  titleStyle = { // 节点标题的样式
    stroke: 'white',
    fill: '#FFAB08',
    lineWidth: 0,
    fillOpacity: 1,
    radius: 5,
  };

  fontSubtitle = { // 节点字标题的样式
    fontSize: 11,
    fontWeight: 500,
    fontFamily: 'PingFang SC',
    fontColor: '#9655FF',
  };

  splitLineStyle = { // 分割线的样式
    stroke: '#E8E8E8',
    lineWidth: 1,
  };

  nodePadding = { // 节点的padding
    top: 10,
    bottom: 10,
    left: 15,
    right: 15,
  };

  headerPadding = { // 头部的padding
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

  fontText = { // content部分的文本样式
    fontSize: 13,
    fontWeight: 400,
    fontFamily: 'PingFang SC',
    fontColor: '#181819',
  };

  fontTitle = { // header中标题的文本样式
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'PingFang SC',
    fontColor: '#FFFFFF',
  };

  fontTip = { // 气泡文字的样式
    fontSize: 13,
    fontWeight: 400,
    fontFamily: 'PingFang SC',
    fontColor: '#9B9B9B',
  };

  fontCondition = { // 条件语句的文字样式
    fontSize: 13,
    fontWeight: 400,
    fontFamily: 'PingFang SC',
    fontColor: '#9B9B9B',
  };

  headerSizeConfig = {
    tipLogoSize: 0,
    textWidth: 0,
    lineHeight: 0,
    titleWidth: 0,
    logoSize: 0,
    logoTitleGap: 0,
    trashSize: 0,
    minContentHeight: 0,
  }
  utilityFuns = {}
  headerConfig = {}
  logos = { nodeLogo: '', trashLogo: '' }
  /**
   * @description 初始化
   * @param {Object} logos 卡片的logo
   * @param {Object} styles 传入的新样式对象
   * @param {Object} headerConfig header部分的配置对象
   * @param {Object} utilityFuns 工具函数
   */
  constructor(logos: any, styles: any, headerConfig: any, utilityFuns: any) {
    this.logos = logos;
    this.headerConfig = headerConfig;
    this.utilityFuns = utilityFuns;
    this.mergeStyle(styles);
    this.headerSizeConfig =  this.initHeaderSizeConfig();
  }

  // 根据merge后的style进一步计算节点需要的其他数据
  initHeaderSizeConfig() {
    const [logoTitleGap, trashTitleGap, tipLogoSize, lineHeight, minHeight] = [10, 10, 25, 10, 100];
    const { fontSize } = this.fontTitle;
    const [logoSize, trashSize] = [fontSize, fontSize];
    const { nodeWidth } = this.basicConfig;
    const { left: leftH, right: rightH, top: topH, bottom: bottomH } = this.headerPadding;
    const { left: leftN, right: rightN, top: topN, bottom: bottomN } = this.nodePadding;

    const titleWidth = nodeWidth - leftH - logoSize - logoTitleGap - trashTitleGap - trashSize - rightH;
    const textWidth = nodeWidth - leftN - rightN;
    const minContentHeight = minHeight - (topH + bottomH + fontSize + topN + bottomN);

    return {
      logoTitleGap,
      trashTitleGap,
      tipLogoSize,
      lineHeight,
      logoSize,
      trashSize,
      titleWidth,
      textWidth,
      minHeight,
      minContentHeight,
    };
  }

  /**
   * @description 将传入的样式与内置的样式合并
   * @param {Object} newStyle 传入的新样式对象
   */
  mergeStyle(newStyle: any) {
    Object.keys(newStyle).forEach((item) => {
      this[item] = {
        ...this[item],
        ...newStyle[item],
      };
    });
  }

  /**
     * 在每个分支的卡片中间设置锚点
     * @param {Number} nodeHeight 头部高度
     * @param {Number} branchHeights 各分支卡片的高度
     */
  // FIXME 根据shape的高度来计算锚点位置
  generateAnchors(nodeHeight: any, branchHeights: any) {
    const anchors = [];
    const headerHeight = this.fontTitle.fontSize + this.headerPadding.top + this.headerPadding.bottom;
    const leftAnchor = [0, headerHeight / 2 / nodeHeight];
    anchors.push(leftAnchor);
    let curHeight = headerHeight;
    branchHeights.forEach((branchHeight: number) => {
      const curAnchor = [1, (curHeight + (branchHeight / 2)) / nodeHeight];
      curHeight += branchHeight;
      anchors.push(curAnchor);
    });
    return anchors;
  }

  /**
   * @description 绘制提示ICON
   * @param {*} contentGroup 内容组
   * @param {*} invalidInfo 非法信息
   */
  drawTipIcon(contentGroup: any, invalidInfo: any, treeErrData: any) {
    const { msg, type } = treeErrData;
    const standaloneMsg: any[] = [];

    // 获取要展示的非法信息
    const fullContent = '检查非法值';
    invalidInfo.forEach((info: any) => {
      if (typeof info.standalone === 'string') {
        standaloneMsg.push(info.standalone);
      }
    });
    const { tipLogoSize } = this.headerSizeConfig;
    const img = warnningImg;

    // 绘制提示的icon
    contentGroup.addShape('image', {
      attrs: {
        x: 0 + this.basicConfig.nodeWidth - (tipLogoSize / 2),
        y: 0 - (tipLogoSize / 2),
        width: tipLogoSize,
        height: tipLogoSize,
        img,
      },
      capture: true,
      needTooltip: true,
      fullContent: [fullContent, msg, ...standaloneMsg],
      name: 'tip',
    });
  }

  /**
   * @description 绘制文本的通用函数.从某一行的中间位置开始填充文本，包括计算换行；主要是对X坐标的处理
   * @param {String} text 原始文本
   * @param {String} lastText 愿文本之前的同行文本
   * @param {Object} fontOption 文本使用的字体信息
   * @param {Number} borderLeftX 左边界坐标
   * @param {Number} startX 行内开始X坐标
   * @param {Number} startY 行内开始Y坐标
   * @param {String} changedColor 新的文字颜色
   * @param {Number} maxLines 文本最大行数
   * @param {Number} changedTextWidth 新的文本最大宽度
   */
  drawText(group: any, text: any, lastText = '', fontOption: { fontSize: any; fontWeight: any; fontFamily: any; fontColor: any; }, borderLeftX: any, startX: any, startY: any, changedColor: any, maxLines: number, changedTextWidth?: number) {
    // 准备会使用到的变量
    const {
      fontSize, fontWeight, fontFamily, fontColor,
    } = fontOption;
    const textWidth = changedTextWidth || this.headerSizeConfig.textWidth;
    let [cursorX, cursorY] = [startX, startY];
    const textColor = changedColor || fontColor;

    // 根据单行长度限制对完整文本进行分割
    const wholeText = `${lastText}${text}`;
    let texts = splitText(wholeText, fontSize, textWidth);
    if (maxLines && texts.length > maxLines) {
      texts = texts.slice(0, maxLines);
      const lastLine = texts[maxLines - 1];
      const content = lastLine.slice(0, lastLine.length - 2);
      texts[maxLines - 1] = `${content}...`;
    }
    const firstLineText = texts[0].slice(lastText.length);

    // 逐行绘制文本
    texts.forEach((line: any, index: number) => {
      let item = line;
      if (index === 0) {
        item = firstLineText;
      } else {
        cursorY += fontSize + this.headerSizeConfig.lineHeight;
        cursorX = borderLeftX;
      }
      group.addShape('text', {
        attrs: {
          fill: textColor,
          x: cursorX,
          y: cursorY,
          text: item,
          textAlign: 'start',
          textBaseline: this.basicConfig.textBaseline,
          fontSize,
          fontWeight,
          fontFamily,
        },
        capture: true,
        draggable: true,
      });
    });
    const lastLineText = texts[texts.length - 1];
    const lastLineWidth = calculateFontWidth(lastLineText, fontSize, textWidth);
    const [endX, endY] = [borderLeftX + lastLineWidth, cursorY];

    // 返回文本结束的光标位置和最后一行的文本
    return {
      endX,
      endY,
      lastLineText,
    };
  }

  /**
   * @description 处理Title部分，包括一些logo
   * TODO: 提示log未添加/删除logo的事件未添加
   * @param {*} group
   * @param {String} title 标题的文本
   * @param {Number} originX 起始位置X坐标
   * @param {Number} originY 起始位置Y坐标
   * @param {Object} headerConfig header部分的配置对象
   */
  drawHeader = (group: { addShape: (arg0: string, arg1: { attrs: { x: any; y: any; width: number; height: number; lineWidth: number; fill: string; fillOpacity: number; radius: number[]; } | { x: any; y: any; width: any; height: any; img: any; } | { x: any; y: any; width: any; height: any; fill: string; fillOpacity: number; cursor: string; } | { x: any; y: any; width: any; height: any; img: any; cursor: string; }; capture: boolean; draggable?: boolean; name?: string; }) => void; }, title: any, originX: number, originY: number, headerConfig: { hasDelete?: any; defaultTitle?: any; }) => {
    const {
      fontSize,
    } = this.fontTitle;
    const {
      hasDelete, defaultTitle,
    } = headerConfig;
    const { titleWidth } = this.headerSizeConfig;
    const headerHeight = this.headerPadding.top + this.headerPadding.bottom + fontSize;

    // 绘制header的轮廓
    group.addShape('rect', {
      attrs: {
        x: originX,
        y: originY,
        width: this.basicConfig.nodeWidth,
        height: headerHeight,
        lineWidth: this.titleStyle.lineWidth,
        fill: this.titleStyle.fill,
        fillOpacity: this.titleStyle.fillOpacity,
        radius: [this.titleStyle.radius, this.titleStyle.radius, 0, 0],
      },
      capture: true,
      draggable: true,
    });
    let startX = originX + this.headerPadding.left;
    const startY = originY + this.headerPadding.top;

    // 绘制logo的图片
    group.addShape('image', {
      attrs: {
        x: startX,
        y: startY,
        width: this.headerSizeConfig.logoSize,
        height: this.headerSizeConfig.logoSize,
        img: this.logos.nodeLogo,
      },
      capture: false,
    });
    const titleToShow = title || defaultTitle;
    startX += this.headerSizeConfig.logoSize + this.headerSizeConfig.logoTitleGap;

    // 绘制标题的文本
    this.drawText(group, titleToShow, '', this.fontTitle, startX, startX, startY, undefined, 1, titleWidth);

    // 根据hasDelete的值,确定是否绘制删除按钮
    if (hasDelete) {
      startX = originX + this.basicConfig.nodeWidth - this.headerPadding.right - this.headerSizeConfig.trashSize;
      const trashArea = group.addShape('rect', {
        attrs: {
          x: startX,
          y: startY,
          width: this.headerSizeConfig.trashSize,
          height: this.headerSizeConfig.trashSize,
          fill: this.titleStyle.fill,
          fillOpacity: this.titleStyle.fillOpacity,
          cursor: 'pointer',
        },
        capture: true,
        draggable: true,
      });
      (trashArea as any).set('className', 'trash-delete');
      group.addShape('image', {
        attrs: {
          x: startX,
          y: startY,
          width: this.headerSizeConfig.trashSize,
          height: this.headerSizeConfig.trashSize,
          img: this.logos.trashLogo,
          cursor: 'pointer',
        },
        name: 'trash-delete',
        capture: false,
      });
    }

    // 返回绘制结束时光标位置
    return {
      startX: originX,
      startY: originY + this.headerPadding.top + fontSize + this.headerPadding.bottom,
    };
  };

  /**
   * @description 绘制初次创建节点时生成默认样式的节点的content
   * @param {Number} startX 光标位置X坐标
   * @param {Number} startY 光标位置Y坐标
   * @param {Number} originX 起始位置X坐标
   * @param {Number} originY 起始位置Y坐标
   * @param {*} contentGroup 内容组
   * @param {*} group 节点组
   */
  drawEmptyNodeContent(startX: number, startY: number, originX: number, originY: number, contentGroup: { addShape: (arg0: string, arg1: { attrs: { fill: string; x: any; y: any; text: any; textAlign: string; textBaseline: string; fontSize: number; fontWeight: number; fontFamily: string; }; capture: boolean; draggable: boolean; }) => void; toFront: () => void; }, group: { addShape: (arg0: string, arg1: { attrs: { x: any; y: any; width: number; height: number; lineWidth: any; stroke: any; fill: string; fillOpacity: number; shadowColor: string; shadowBlur: number; shadowOffsetX: number; shadowOffsetY: number; radius: number[]; anchors: number[][]; }; capture: boolean; draggable: boolean; }) => any; }) {
    // 根据默认配置生成要展示的文本数组
    const lines = splitText(
      this.nodeDefaultStyle.tips,
      this.nodeDefaultStyle.fontSize,
      this.basicConfig.nodeWidth - this.nodePadding.left - this.nodePadding.right,
    );
    const [firstLine] = lines;
    let tipToShow = firstLine;
    if (lines.length > 1) {
      const content = firstLine.slice(0, firstLine.length - 2);
      tipToShow = `${content}...`;
    }
    const headerHeight = this.fontTitle.fontSize + this.headerPadding.top + this.headerPadding.bottom;

    // 绘制空节点content部分的文本
    contentGroup.addShape('text', {
      attrs: {
        fill: this.nodeDefaultStyle.fontColor,
        x: startX + (this.basicConfig.nodeWidth / 2),
        y: startY + ((this.nodeDefaultStyle.defaultHeight - headerHeight) / 2),
        text: tipToShow,
        textAlign: 'center',
        textBaseline: 'middle',
        fontSize: this.nodeDefaultStyle.fontSize,
        fontWeight: this.nodeDefaultStyle.fontWeight,
        fontFamily: this.nodeDefaultStyle.fontFamily,
      },
      capture: true,
      draggable: true,
    });
    const anchors = [
      [0, headerHeight / 2 / this.nodeDefaultStyle.defaultHeight],
      [1, (this.nodeDefaultStyle.defaultHeight + headerHeight) / 2 / this.nodeDefaultStyle.defaultHeight],
    ];

    // 绘制空节点的外轮廓
    const keyShape = group.addShape('rect', {
      attrs: {
        x: originX,
        y: originY,
        width: this.basicConfig.nodeWidth,
        height: this.nodeDefaultStyle.defaultHeight,
        lineWidth: this.deactiveNodeStyle.lineWidth,
        stroke: this.deactiveNodeStyle.stroke,
        fill: this.deactiveNodeStyle.fill,
        fillOpacity: this.deactiveNodeStyle.fillOpacity,

        shadowColor: this.deactiveNodeStyle.shadowColor,
        shadowBlur: this.deactiveNodeStyle.shadowBlur,
        shadowOffsetX: this.deactiveNodeStyle.shadowOffsetX,
        shadowOffsetY: this.deactiveNodeStyle.shadowOffsetY,

        radius: [this.deactiveNodeStyle.radius, this.deactiveNodeStyle.radius, this.deactiveNodeStyle.radius,
          this.deactiveNodeStyle.radius],
        anchors, // 自定义属性，用来设置锚点
      },

      capture: true,
      draggable: true,
    });
    contentGroup.toFront();
    return keyShape;
  }

  /**
   * @description 绘制有内容的节点的content部分
   * @param {*} group 绘制内容的容器
   * @param {Object} nodeData 节点的数据
   * @param {Object} cursorSite 当前的绘制的光标位置
   */
  drawNormalNodeContent(group: any, nodeData: { id: any; }, cursorSite: { startX: any; startY: any; }) {
    // 根据默认配置生成要展示的文本数组
    return (this as any).drawContent(group, nodeData, cursorSite.startX, cursorSite.startY);
  }

  /**
   * @description 绘制节点的外轮廓,用于G6的交互
   * @param {*} group 绘制内容的容器
   * @param {Number} originX 节点初始位置的X坐标
   * @param {Number} originY 节点初始位置的Y坐标
   * @param {Object} cursorSite 当前的绘制的光标位置
   */
  drawNodeOutline(group: {
      addShape: (arg0: string, arg1: {
        attrs: {
          anchors: number[][]; // 未被选中的节点的样式
          fill: string; fillOpacity: number; radius: number; shadowColor: string; shadowBlur: number; shadowOffsetX: number; shadowOffsetY: number; x: any; y: any; width: number; height: number;
        }; name: string; capture: boolean; draggable: boolean;
      }) => any;
    }, originX: number, originY: number, cursorSite: { startX?: any; startY?: any; heights?: any; }) {
    const nodeHeight = cursorSite.startY - originY;
    const {
      heights,
    } = cursorSite;
    const anchors = this.generateAnchors(nodeHeight, heights);

    // 绘制外轮廓
    const keyShape = group.addShape('rect', {
      attrs: {
        x: originX,
        y: originY,
        width: this.basicConfig.nodeWidth,
        height: nodeHeight,
        ...this.deactiveNodeStyle,
        anchors, // 自定义属性，用来设置锚点
      },
      name: 'start-node-body',
      capture: true,
      draggable: true,
    });

    return keyShape;
  }

  // G6规定的节点生命周期函数
  draw(cfg: any, group: any) {
    // 创建内容组
    const contentGroup = group.addGroup({
      id: 'content',
    });
    const [originX, originY] = [0, 0];
    const {
      name,
      id,
    } = cfg.nodeData;

    // 绘制节点的header部分
    let cursorSite = this.drawHeader(contentGroup, name, originX, originY, this.headerConfig);

    // 节点没有数据时，根据默认配置绘制卡片
    const clickedNodes: any[] = [];// 获取选中节点
    if (!clickedNodes.includes(id)) {
      return this.drawEmptyNodeContent(cursorSite.startX, cursorSite.startY, originX, originY, contentGroup, group as any);
    }

    // 节点有数据时,根据配置绘制卡片
    cursorSite = this.drawNormalNodeContent(contentGroup, cfg.nodeData, cursorSite);

    // 绘制节点的外轮廓,用于G6的交互
    const keyShape = this.drawNodeOutline(group as any, originX, originY, cursorSite);

    // 内容部分要覆盖外轮廓部分,所以将内容部分上移
    contentGroup.toFront();

    return keyShape;
  }

  setState(name?: string | undefined, value?: any, item?: any) {
    // 更换shape样式的函数
    function setShapeAttr(shape: { attr: (arg0: { stroke: any; lineWidth: any; }) => void; }, newNodeStyle: { stroke?: any; fill?: string; lineWidth?: any; fillOpacity?: number; radius?: number; shadowColor?: string; shadowBlur?: number; shadowOffsetX?: number; shadowOffsetY?: number; }) {
      shape.attr({
        stroke: newNodeStyle.stroke,
        lineWidth: newNodeStyle.lineWidth,
      });
    }
    const shape = item.getKeyShape();
    if (name === 'click') {
      if (value) {
        setShapeAttr(shape, this.activeNodeStyle);
      } else {
        setShapeAttr(shape, this.deactiveNodeStyle);
      }
    } else if (name === 'hover') {
      if (!item.hasState('click')) {
        if (value) {
          setShapeAttr(shape, this.activeNodeStyle);
        } else {
          setShapeAttr(shape, this.deactiveNodeStyle);
        }
      }
    }
  }
  getAnchorPoints(cfg: any) {
    return cfg.anchors;
  }
}

export default NodeFactory;

// 节点的个性化配置
const baseStyle = {
  nodeDefaultStyle: {
    tips: '分析基础节点',
  },
  activeNodeStyle: {
    stroke: '#1154FF',
  },
  titleStyle: {
    fill: '#1154FF',
  },
  noConfigStyle: {
    placeholder: '{未配置节点内容}',
  },
};
const logos = {
  trashLogo, nodeLogo, tipLogo,
};
const headerConfig = {
  hasDelete: true, defaultTitle: '机器人答案',
};
const utilityFuns = {};

const baseNode = new NodeFactory(logos, baseStyle, headerConfig, utilityFuns);

export const baseNodeConfig = {
  draw: baseNode.draw.bind(baseNode),
  setState: baseNode.setState.bind(baseNode),
  getAnchorPoints: baseNode.getAnchorPoints.bind(baseNode),
};
