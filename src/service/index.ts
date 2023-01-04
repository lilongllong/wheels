import axios from 'axios';

axios.defaults.timeout = 100000;
axios.defaults.baseURL = 'http://127.0.0.1:3000/api/';

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json',
      // CORS 跨域问题，前端尝试代理 proxy 访问，但是无效；最后在后端配置允许跨域才行
      // 'Access-Control-Allow-Origin': true,
      // mode: 'no-cors',
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 2){
      console.log('过期');
    }
    return response;
  },
  (error) => {
    console.log('请求出错', error);
  }
);

export default (fetch: string, url: string, params: {}) => {
  return new Promise((resolve, reject) => {
    switch (fetch) {
      case 'get':
        axios.get(url, {params: params})
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
        break;
      case 'post':
        axios.post(url, params)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
        break;
      default:
        break;
    }
  })
}
