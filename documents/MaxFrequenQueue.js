const FreqStack = function() {
  this.maxFreq = 0;
  this.queueMap = new Map();
  this.freqMap = new Map();
  return this;
};

/**
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function (val) {
  const f = this.queueMap.has(val) ? this.queueMap.get(val) + 1 : 1;
  this.queueMap.set(val, f);
  const arr = this.freqMap.get(f)
  this.freqMap.set(f, this.freqMap.get(f) ? [...this.freqMap.get(f), val] : [val]);
  if (f > this.maxFreq) {
    this.maxFreq = f;
  }
  return val;
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function() {
  const value = this.freqMap.get(this.maxFreq).pop();
  this.queueMap.set(value, this.queueMap.get(value) - 1);
  if (this.freqMap.get(this.maxFreq).length === 0) {
    this.maxFreq--;
  }
  return value;
};

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */

const queue = new FreqStack();
queue.push(5);
queue.push(6);
queue.push(7);
queue.push(8);
queue.push(9);

console.log(queue.pop(), queue.pop(), queue.pop());

const queue1 = new FreqStack();
queue1.push(1);
queue1.push(2);
queue1.push(2);
queue1.push(3);
queue1.push(4);

console.log(queue1.pop(), queue1.pop(), queue1.pop());

/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var singleNumbers = function(nums) {
  const frequenceMap = new Map();
  for (let num of nums) {
    if (frequenceMap.has(num) && frequenceMap.get(num)) {
      frequenceMap.delete(num);
    } else {
      frequenceMap.set(num, 1);
    }
  }
  return Array.from(frequenceMap.keys());
};

console.log(singleNumbers([1,2,10,4,1,4,3,3]));

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var allPossibleFBT = function(n) {
  const result = [];
  const checkCurrNode = (arr, leftCurrNode, alreadyNode) => {
    if (alreadyNode === n) {
      result.push(arr);
      return;
    }
    if (alreadyNode > n || leftCurrNode === 0) {
      return;
    }
    const left = [...arr, 0, 0];
    const right = [...arr, null, null];
    // + 2
    checkCurrNode(left, leftCurrNode + 1, alreadyNode + 2);
    checkCurrNode(right, leftCurrNode - 1, alreadyNode);
  };
  checkCurrNode([], 1, 1);
  return result;
};

console.log(allPossibleFBT(7));


/**
 * @param {number} n
 * @return {number}
 */
 var checkRecord = function(n) {
  if (n === 1) {
    return 3;
  }
  const maxSum = BigInt(Math.pow(10, 9) + 7);
  // 首先是二分法
  const twoMap = new Map();
  twoMap.set(1, BigInt(2));
  twoMap.set(2, BigInt(4));
  twoMap.set(3, BigInt(7));
  let lastCurr = [BigInt(4), BigInt(2), BigInt(1)];
  let i = 4;
  while(i <= n) {
    const newLastCurr = [];
    // index_0
    newLastCurr.push(lastCurr[0]); // 0
    newLastCurr.push(lastCurr[0]); // 1
    // index_1
    newLastCurr[0] = newLastCurr[0] + lastCurr[1]; // 0
    newLastCurr.push(lastCurr[1]); // 2
    // index_2
    newLastCurr[0] = newLastCurr[0] + lastCurr[2];
    const sum = newLastCurr.reduce((target, curr) => target + curr, BigInt(0));
    twoMap.set(i, sum % maxSum);
    lastCurr = newLastCurr.map(item => item % maxSum);
    i++;
  }
  let result = BigInt(0);


  for (let index = 0; index < n; index++) {
    // 左侧
    if (index === 0) {
      result = result + twoMap.get(n - index - 1);
    } else if (index === n - 1) {
      result = result + twoMap.get(index);
    } else {
      result = result + twoMap.get(n - index - 1) * twoMap.get(index);
    }
    result = result % maxSum;
  }

  result = result + twoMap.get(n);
  return Number(result % maxSum);
};

console.log(checkRecord(101010));
