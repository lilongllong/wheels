/**
 * 请求重试若干次，若成功则返回成功结果，若全失败则返回失败
 */

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

function repeatFetch(fetch, count) {
  return new Promise((resolve, reject) => {
    let index = 0;
    let isFetching = false;
    while(index < count) {
      if (!isFetching) {
        isFetching = true;
        fetch().then((data) => {
          isFetching=false;
          resolve(data);
        }).catch((error) => {
          index ++;
          isFetching = false;
          if (index === count) {
            reject(error);
          }
        });
      } else {
        // 正在请求中，可以对超时也在这里控制下
      }
    }
    
  });
}