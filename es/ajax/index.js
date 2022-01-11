function createXMLHttpRequest() {
    var request = null;
    if (window.XMLHttpRequest) { //判定兼容性
        request = new XMLHttpRequest(); //Dom2浏览器
    }
    else if (window.ActiveXObject) { //IE浏览器
        try {
            request = new ActiveXObject('msxml2.XMLHTTP');
        }
        catch (e) {
            try {
                request = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (e) {
                console.log('can\'t create http request.');
            }
        }
    }
    return request;
}
function get(url) {
    return new Promise(function (resolve, reject) {
        var request = createXMLHttpRequest();
        request.open('GET', url, true);
        request.setRequestHeader('content-Type', 'applicaion/json');
        //设置请求头编码方式
        request.onreadystatechange = function () {
            var result = {
                success: false,
                errorMsg: '',
                data: null,
            };
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) { //请求成功
                    var response = null;
                    try {
                        response = JSON.parse(request.responseText);
                    }
                    catch (e) {
                        result.errorMsg = '服务器返回值解析错误';
                        response = null;
                    }
                    if (response) {
                        result.success = response.success;
                        result.data = response.data;
                        result.errorMsg = response.errorMsg;
                    }
                    resolve(result);
                }
                else {
                    result.errorMsg = '网络请求错误';
                    result.code = request.status;
                    reject(result);
                }
            }
        };
        request.send(null); //发送请求
    });
}
function post(url, body) {
    return new Promise(function (resolve, reject) {
        var request = createXMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('content-Type', 'application/json');
        //设置请求头编码方式
        request.onreadystatechange = function () {
            var result = {
                success: false,
                errorMsg: '',
                data: null,
            };
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) { //请求成功
                    var response = null;
                    try {
                        response = JSON.parse(request.responseText);
                    }
                    catch (e) {
                        result.errorMsg = '服务器返回值解析错误';
                        response = null;
                    }
                    if (response) {
                        result.success = response.success;
                        result.data = response.data;
                        result.errorMsg = response.errorMsg;
                    }
                    resolve(result);
                }
                else {
                    result.errorMsg = '网络请求错误';
                    result.code = request.status;
                    reject(result);
                }
            }
        };
        request.send(body); //发送请求
    });
}
export default { get: get, post: post };
//# sourceMappingURL=index.js.map