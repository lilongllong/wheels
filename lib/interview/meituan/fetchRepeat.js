"use strict";
/**
 * 请求重试若干次，若成功则返回成功结果，若全失败则返回失败
 */
function fetchApi(url, params) {
    return new Promise(function (resolve, reject) {
        fetch(url, params).then(function (data) {
            if (data.code === 0) {
                resolve(data);
            }
            reject(new Error('request'));
        }).catch(function (error) {
            reject(error);
        });
    });
}
function repeatFetch(fetch, count) {
    return new Promise(function (resolve, reject) {
        var index = 0;
        var isFetching = false;
        while (index < count) {
            if (!isFetching) {
                isFetching = true;
                fetch().then(function (data) {
                    isFetching = false;
                    resolve(data);
                }).catch(function (error) {
                    index++;
                    isFetching = false;
                    if (index === count) {
                        reject(error);
                    }
                });
            }
            else {
                // 正在请求中，可以对超时也在这里控制下
            }
        }
    });
}
//# sourceMappingURL=fetchRepeat.js.map