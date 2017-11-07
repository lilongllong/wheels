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
    if (typeof obj !== "object" || obj === null) {
        if (typeof obj === "function") {
            return new Function(obj.toString());
        }
        return obj;
    } else {
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            return obj.map(item => deepClone(item));
        } else if (Object.prototype.toString.call(obj) === '[object Object]') {
            const newObj = Object.assign({}, obj);
            for(let key in newObj) { 
                if (newObj.hasOwnProperty(key)) {                                  
                    newObj[key] = deepClone(newObj[key]);
                }
            }
            return newObj;
        } else if (obj.constructor.name === 'RegExp') {
            return obj;
        } else if (obj.constructor.name === 'NodeList' || /^HTML.*Element$/.test(obj.constructor.name)) {
            console.log('ok', obj);
            return obj.cloneNode(true);
        } else if (Object.prototype.toString.call(obj) === '[object Date]') {
            return new Date(obj.getTime());
        } else {
            return obj;
        }
    }
}

var c = new A();
var b = deepClone(c);
console.log(c.a === b.a);
console.log(c, b);