// 题目
/*
使用原生javascript给下面列表中的li节点绑定点击事件,点击时创建一个Object对象,兼容IE和标准浏览器

<ul id="nav">
    <li><a href="http://11111">111</a></li>
    <li><a href="http://2222">222</a></li>
    <li><a href="http://333">333</a></li>
    <li><a href="http://444">444</a></li>
</ul>

Object:
{
    "index": 1,
    "name": "111",
    "link": "http://1111"
}
*/

/* 知识点注释
和dom中的事件对象做对比：
几个重要的方法和属性分别是：
（1）事件类型：同为type属性；
（2）事件作用目标：ie为srcElement属性；
（3）阻止事件冒泡：ie为canceBubble属性；（设置为ture为阻止冒泡，false为允许）；
（4）阻止事件默认行为：ie为retureValue属性；（设置为ture为阻止，false是允许）；
同样通过判断浏览器的能力来选择使用哪一个事件对象；
event对象在ie中和其他浏览器也不同：
在ie中直接用window.event;

传统浏览器中的this指向的是当前目标，但是IE中指向的window对象，需要通过apply, call改变
*/

var EventUtil = {
    getEvent: function(event) {
        return event || window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    on: function(ele, type, handler) {
        if (ele.addEventListener) {
            ele.addEventListener(type, handler, false);
            return handler;
        } else if (ele.attachEvent) {
            // 传统浏览器中的this指向的是当前目标，但是IE中指向的window对象，需要通过apply, call改变
            function wraper(event) {
                return handler.call(ele, event);
            }
            ele.attachEvent('on' + type, wraper);
            return wraper;
        }
    },
    off: function(ele, type, handler) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, handler, false);
        } else if (ele.detachEvent) {
            ele.detachEvent('on' + type, handler);
        }
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault(event);
        } else if ('returnValue' in event) {
            event.returnValue = false;
        }
    }, 
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation(event);
        } else if ('cancelBubble' in event) {
            event.cancelBubble = true;
        }
    }
};

const DOMUtil = {
    text: function(ele) {
        if ('textContent' in ele) {
            return ele.textContent;
        } else if ('innerText' in ele) {
            return ele.innerText;
        }
    },
    prop: function(ele, propName) {
        return ele.getAttribute(propName);
    }
};

const ArrayUtil = {
    includes: function(domArr, target) {
        const arr = Array.prototype.slice.call(domArr, 0);
        return arr.includes(target);
    }
};

var nav = document.getElementById('nav');
EventUtil.on(nav, 'click', function(e) {
    EventUtil.stopPropagation(e);
    EventUtil.preventDefault(e);
    var target = EventUtil.getTarget(e);
    var event = EventUtil.getEvent(e);

    var children = this.children;
    var len = this.children.length;
    var obj = {};

    for (var i = 0; i < len; i++) {
        if (children[i] === target) {
            // 响应元素为li
            obj.index = i + 1;
            var anchor = target.getElementByTagName('a')[0];
            obj.name = DOMUtil.text(anchor);
            obj.link = DOMUtil.prop(anchor, 'href');
        } else if (ArrayUtil.includes(children[i].children, target)) {
            // 响应元素为a
            obj.index = i + 1;
            var anchor = target;
            obj.name = DOMUtil.text(anchor);
            obj.link = DOMUtil.prop(anchor, 'href'); 
        }
    }
    alert(JSON.stringify(obj));
});