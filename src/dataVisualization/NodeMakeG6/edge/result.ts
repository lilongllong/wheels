import EdgeFactory from './edgeFactory';

const answerEdge = new EdgeFactory({ color: '#1154FF' });

export default {
  draw: answerEdge.draw.bind(answerEdge),
  setState: answerEdge.setState.bind(answerEdge),
};
