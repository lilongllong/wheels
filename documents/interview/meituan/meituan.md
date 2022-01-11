params promise count

// 压力测试，模拟化测试，
// 沟通成本
// 灵活，个性化

function fetchApi(url, params) {
  return new Promise((resolve, reject) => {
    fetch(url, params).then((data) => {
      if (data.code === 0) {
        resolve(data);
      }
      reject(new Error('request'))
    }).catch(error => {
      reject(error);
    });
  });
}

function tryAgain(func, conut) {
  let index = 0;
  let fetchStatus = false;
  return new Promise((resolve, reject) => {
    getPromise(func).then(res => {
      if (res) {
        resolve(res);
      }
      index ++;
      getPromise(func);
    }).catch(error => {

    });
  });
  while (index < count) {
    if (!fetchStatus) {
      fetchStaus = true;
      func().then((data) => {
        if (data.code === 0) {
          return Promise.resolve(data);
        }
        index ++;
        fetchStatus = false;
        if (index === count) {
          return Promise.reject('业务错误');
        }
      }).catch(error => {
        fetchStatus = false;
        if (index === count) {
          return Promise.reject('业务错误');
        }
      });
    } else {
      // 跳过
    }
  }
  reject();
}

function getPromise(func, resolve, reject) {
  return new Promise((resolve, reject) => {
    return func();
  });
}