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
