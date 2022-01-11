"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shape = require("./Shape");
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(args) {
        var _this = _super.call(this, args) || this;
        _this._type = "Circle";
        _this._radius = null;
        return _this;
    }
    Object.defineProperty(Circle.prototype, "centerLocation", {
        set: function (value) {
            if (Array.isArray(value) && value.length >= 2) {
                this._centerLocation = {
                    x: value[0],
                    y: value[1]
                };
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () {
            return this._radius ? this.radius : false;
        },
        set: function (value) {
            if (typeof (value) === 'number') {
                this._radius = value;
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    return Circle;
}(Shape));
exports["default"] = Circle;
module.exports = exports["default"];
//# sourceMappingURL=Circle.js.map