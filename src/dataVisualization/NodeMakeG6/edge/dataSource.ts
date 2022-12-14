import EdgeFactory from './edgeFactory';

// 新建节点对象,导出节点的生命周期函数
const dataSourceEdge = new EdgeFactory({ color: '#4E4E4E' });

export default {
  draw: dataSourceEdge.draw.bind(dataSourceEdge),
  setState: dataSourceEdge.setState.bind(dataSourceEdge),
};
