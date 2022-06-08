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



