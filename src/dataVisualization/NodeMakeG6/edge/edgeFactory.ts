import { getPath } from '../utils/index';

class EdgeFactory {
  lineStyle = {
    stroke: '#4E4E4E',
    opacity: 0.4,
    lineWidth: 2,
    lineAppendWidth: 5,
  };

  activeLineStyle = {
    stroke: '#4E4E4E',
    lineWidth: 2,
    lineAppendWidth: 5,
    opacity: 1,
  };

  circleStyle = {
    stroke: '#4E4E4E',
    fill: '#4E4E4E',
    opacity: 0.4,
  };

  activeCircleStyle = {
    stroke: '#4E4E4E',
    fill: '#4E4E4E',
    lineWidth: 2,
    opacity: 1,
  };
  anchorStartGap = 10;

  anchorEndGap = 10;

  maxRadius = 20;

  constructor(value: Partial<{ color: string; anchorStartGap: number; anchorEndGap: number; maxRadius: number }>) {
    const { color, anchorStartGap, anchorEndGap, maxRadius } = value;
    if (color) {
      this.lineStyle.stroke = color;
      this.activeLineStyle.stroke = color;
      this.circleStyle.stroke = color;
      this.circleStyle.fill = color;
      this.activeCircleStyle.fill = color;
      this.activeCircleStyle.stroke = color;
    }
    if (typeof anchorStartGap !== 'undefined') {
      this.anchorStartGap = anchorStartGap;
    }
    if (typeof anchorEndGap !== 'undefined') {
      this.anchorEndGap = anchorEndGap;
    }
    if (typeof maxRadius !== 'undefined') {
      this.maxRadius = maxRadius;
    }
  }
  draw(cfg: any, group: any) {
    const { startPoint, endPoint } = cfg;
    const { x: sX, y: sY } = startPoint;
    const { x: eX, y: eY } = endPoint;
    const startX = sX - this.anchorStartGap;
    const startY = sY;
    const endX = eX + this.anchorEndGap;
    const endY = eY;
    const path = getPath(
      { startX, startY },
      {
        endX,
        endY,
      },
      this.maxRadius,
    );

    const keyShape = group.addShape('path', {
      attrs: {
        path,
        ...this.lineStyle,
      },
      name: 'edge-path',
    });

    group.addShape('circle', {
      attrs: {
        ...this.circleStyle,
        x: startX,
        y: startY,
        r: 4,
      },
      name: 'edge-circle',
    });

    return keyShape;
  }
  setState(name: any, value: any, edge: any) {
    // 更换shape样式的函数
    if (!edge) return;
    function setShapeAttr(shape: any, newNodeStyle: any) {
      shape.attr(newNodeStyle);
    }
    const shape = edge.getKeyShape();
    const circleShape =
      shape.cfg?.parent?.getLast() || shape.cfg?.parent?.cfg?.children?.[1];
    if (name === 'click') {
      if (!value) {
        if (shape.cfg?.type === 'path') {
          setShapeAttr(shape, this.lineStyle);
        }
        if (circleShape.cfg?.type === 'circle') {
          setShapeAttr(circleShape, this.circleStyle);
        }
      } else {
        if (shape.cfg?.type === 'path') {
          setShapeAttr(shape, this.activeLineStyle);
        }
        if (circleShape.cfg?.type === 'circle') {
          setShapeAttr(circleShape, this.activeCircleStyle);
        }
      }
    } else if (name === 'hover') {
      if (!edge.hasState?.('click')) {
        if (!value) {
          if (shape.cfg?.type === 'path') {
            setShapeAttr(shape, this.lineStyle);
          }
          if (circleShape.cfg?.type === 'circle') {
            setShapeAttr(circleShape, this.circleStyle);
          }
        } else {
          if (shape.cfg?.type === 'path') {
            setShapeAttr(shape, this.activeLineStyle);
          }
          if (circleShape.cfg?.type === 'circle') {
            setShapeAttr(circleShape, this.activeCircleStyle);
          }
        }
      }
    }
  }
}

export default EdgeFactory;
