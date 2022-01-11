"use strict";
/**
 * 实现一个Event类，继承的对象都含有on, off, trigger, once方法
 *
 */
function Event() {
    if (!(this instanceof Event)) {
        // 继承出错，返回父类对象
        return new Event();
    }
    this._listeners = {};
}
Event.prototype.on = function (type, handler) {
    this._listeners = this._listeners || {};
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].push(handler);
    return this;
};
Event.prototype.off = function (type, handler) {
    this._listeners = this._listeners || {};
    this._listeners[type] = this._listeners[type] || [];
    for (var i_1 = this._listeners[type].length - 1; i_1 >= 0; i_1--) {
        if (this._listeners[type][i_1] === handler) {
            this._listeners[type].splice(i_1, 1);
        }
    }
    return this;
};
Event.prototype.trigger = function (type, data) {
    this._listeners = this._listeners || {};
    this._listeners[type] = this._listeners[type] || [];
    for (var i_2 = this._listeners[type].length - 1; i_2 >= 0; i_2--) {
        this._listeners[type].call(this, data);
    }
};
Event.prototype.once = function (type, handler) {
    var self = this;
    function wrapper() {
        handler.apply(self, handler);
        self.off(wrapper);
    }
    this.on(type, wrapper);
    return this;
};
//# sourceMappingURL=Event.js.map