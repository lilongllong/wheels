// const Vector =  require("./algorithm-1/Vector");
// const vector = new Vector(1, 2);
// console.log(vector.vector);
// console.log(vector.distance());
const judge = require("./index");

console.log(judge.isJoined([0, 0], [6, 6], [7, 7], 1), false);
console.log(judge.isJoined([0, 0], [6, 6], [6, 7], 1), true);
console.log(judge.isJoined([0, 0], [6, 6], [7, 7], 2), true);
console.log(judge.isJoined([0, 0], [6, 6], [5, 5], 2), true);
console.log(judge.isJoined([0, 0], [6, 6], [7, 10], 1), false);
console.log(judge.isJoined([0, 0], [6, 6], [-4, -4], 1), false);
console.log(judge.isJoined([0, 0], [6, 6], [10, 5], 1), false);
