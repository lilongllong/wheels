var a = {
    name: 'qiu',
    birth: new Date(),
    pattern: /qiu/gim,
    container: document.body,
    hobbys: ['book', new Date(), /aaa/gim, 111]
};

function A() {
    this.a = a;
}

function deepClone(obj) {
    var _toString = Object.prototype.toString;
    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    // DOM Node 
    if (obj.nodeType && 'cloneNode' in obj) {
        return obj.cloneNode(true);
    }
    // NodeList document.querySelectorAll() 和 childNodes() 的返回值
    // HTMLCollection document.getElementByTagName, document.getElementByName document.images, document.forms, node.children 的返回值
    // 这两种类型由于其实时性，无法做clone的，一旦使用 Array.prototype.slice.call(nodeList/HtmlCollection, 0)获得数组进行Node.cloneNode其数据类型就会发生变化
    // Date 
    if (_toString.call(obj) === '[object Date]') {
        return new Date(obj.getTime());
    }
    // RegExp
    if (_toString.call(obj) === '[object RegExp]') {
        var flags = [];
        if (obj.global) {
            flags.push('g');
        }
        if (obj.multiline) {
            flags.push('m');
        }
        if (obj.ignoreCase) {
            flags.push('i');
        }
        return new RegExp(obj.source, flags.join(''));
    }
    var result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {};
    for (var key in obj) {
        result[key] = deepClone(obj[key])
    }
    return result;
}

var c = new A();
var b = deepClone(c);
console.log(c.a === b.a);
console.log(c, b);