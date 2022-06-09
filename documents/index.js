/**
 * 问题一：编程题：实现add方案
 * // 限制同一时刻只能执行2个task
      addTask(4000, '1')
      addTask(3500, '2')
      addTask(4000, '3')
      addTask(3000, '4')
      .....

      //Scheduler ？
      //4秒后打印1
      //3.5秒打印2
      //3进入队列，到7.5秒打印3
//...
 */

class Scheduler {
  queueToken = [];
  waitTokenQueue = [];
  constructor(props) {
    const { maxLimit = 2 } = props || {};
    const temp = [];
    for (let i = 0; i < maxLimit; i++) {
      temp.push(i);
    }
    this.queueToken = temp;
  }

  async getToken() {
    return new Promise((resolve, reject) => {
      this.waitTokenQueue.push(resolve);
      this.triggerTokenDeveliver();
    });
  }

  triggerTokenDeveliver() {
    if (this.waitTokenQueue.length > 0) {
      while(this.queueToken.length > 0 && this.waitTokenQueue.length > 0) {
        const resolveInstance = this.waitTokenQueue.shift();
        const token = this.queueToken.shift();
        resolveInstance(token);
      }
    }
  }

  add(func) {
    return new Promise((resolve, reject) => {
      // 获取promise的句柄
      if (typeof func === 'function') {
        // 构造执行体
        this.getToken().then(token => {
          // 占有这个token
          const resP = func();
          if (resP instanceof Promise) {
            resP.then(() => {
              // 释放token
            this.queueToken.push(token);
            // 触发新的token下发
            this.triggerTokenDeveliver();
            resolve();
            }).catch(e => reject(e));
          } else {
            // 释放token
            this.queueToken.push(token);
            // 触发新的token下发
            this.triggerTokenDeveliver();
            resolve();
          }
        });
      } else {
        resolve(func);
      }
    });
  }

}
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}
addTask(4000, '1')
addTask(3500, '2')
addTask(4000, '3')
addTask(4000, '4')

/**
 * 问题2： 判断是否有环
 */
 function ListNode(val) {
  this.val = val;
  this.next = null;
}

let a = new ListNode(4);
let b = a.next = new ListNode(1);
let c = b.next = new ListNode(8);
let d = c.next = new ListNode(4);
let e = d.next = b;

//判断是否有环
//比如上述是有环的

/**
 * 结题思路：最简单的思路
 * 对于循环节点，JSON。stringify会下面的错误
 * VM1856:1 Uncaught TypeError: Converting circular structure to JSON
 * 方案1
 * 多叉树广度优先遍历，不能重复
 * 如何判断节点是否相等
 * 方案2
 * 统计链表长度，大于节点铲毒
 */
function checkLoop(nodes) {
  const checkQueue = [nodes];
  let currentNode = nodes;
  let isLoop = false;
  while(currentNode.next) {
    if (checkQueue.includes(currentNode.next)) {
      return true;
    }
    currentNode = currentNode.next;
    checkQueue.push(currentNode);
  }
  return isLoop;
}

checkLoop();
