/**
 * 
2. 实现一个 HardMan:
HardMan("jack") 输出:
I am jack

HardMan("jack").learn("computer") 输出
I am jack
Learning computer

HardMan("jack").rest(10).learn("computer") 输出
I am jack
//等待10秒
Start learning after 10 seconds
Learning computer

HardMan("jack").restFirst(5).learn("chinese") 输出
//等待5秒
Start learning after 5 seconds
I am jack
Learning chinese
 */

function HardMan(name) {
  this.stack = [`I am ${name}`];
  this.timer = setTimeout(() => {
    this.__go();
  }, 0);
  this.learn = function (str) {
    this.stack.push(`Learning ${str}`);
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.__go();
    }, 0);
    return this;
  }
  this.rest = function (time) {
    this.stack.push({ type: 'delay', time });
    this.stack.push(`Start learning after ${time} seconds`);
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.__go();
    }, 0);
    return this;
  }
  this.restFirst = function (time) {
    this.stack.unshift(`Start learning after ${time} seconds`);
    this.stack.unshift({ type: 'delay', time });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.__go();
    }, 0);
    return this;
  }
  this.__go = function () {
    let timer = 0;
    let startTime = new Date().valueOf();
    while(timer >= 0 && this.stack.length > 0) {
      if (timer > 0) {
        // console.log(timer - (new Date().valueOf() - startTime));
        if (timer - (new Date().valueOf() - startTime) <= 0) {
          timer = 0;
        }
      } else {
        const target = this.stack.shift();
        if (typeof target === 'string') {
          console.log(target);
        } else {
          timer = target.time * 1000;
          startTime = new Date().valueOf();
        }
      }
    }
  }
  return this;
}

// HardMan("jack");
// HardMan("jack").learn("computer");
// HardMan("jack").rest(10).learn("computer");
// HardMan("jack").restFirst(5).learn("chinese");