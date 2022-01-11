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
var Vector = require("./Vector");
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(args) {
        var _this = _super.call(this, args) || this;
        _this._type = "Rectangle";
        _this._startPoint = null;
        _this._endPoint = null;
        _this._diagnalVector = null;
        return _this;
    }
    Object.defineProperty(Rectangle.prototype, "startPoint", {
        get: function () {
            return this._startPoint ? [this._startPoint.x, this._startPoint.y] : null;
        },
        set: function (value) {
            if (Array.isArray(value) && value.length >= 2) {
                this._startPoint = {
                    x: value[0],
                    y: value[1]
                };
                this._updateCenterLocation();
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "endPoint", {
        get: function () {
            return this._endPoint ? [this._endPoint.x, this.endPoint.y] : null;
        },
        set: function (value) {
            if (Array.isArray(value) && value.length >= 2) {
                this._endPoint = {
                    x: value[0],
                    y: value[1]
                };
                this._updateCenterLocation();
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Rectangle.prototype._updateCenterLocation = function () {
        if (this._startPoint && this._endPoint) {
            this._centerLocation = {
                x: (this._startPoint.x + this._endPoint.x) / 2,
                y: (this._startPoint.y + this._endPoint.y) / 2
            };
            this._diagnalVector = [];
            this._diagnalVector.push(new Vector((this._endPoint.x - this._startPoint.x) / 2, (this._endPoint.y - this._startPoint.y) / 2));
            this._diagnalVector.push(new Vector((this._endPoint.x - this._startPoint.x) / 2, -(this._endPoint.y - this._startPoint.y) / 2));
            this._diagnalVector.push(new Vector(-(this._endPoint.x - this._startPoint.x) / 2, -(this._endPoint.y - this._startPoint.y) / 2));
            this._diagnalVector.push(new Vector(-(this._endPoint.x - this._startPoint.x) / 2, (this._endPoint.y - this._startPoint.y) / 2));
        }
        else {
            this._centerLocation = null;
            this._diagnalVector = null;
        }
    };
    Rectangle.prototype.getVectorFrom = function (location) {
        if (!this._centerLocation)
            return false;
        if (Array.isArray(location) && location.length >= 2) {
            return new Vector(location[0] - this._centerLocation.x, location[1] - this._centerLocation.y);
        }
        else if (typeof (location) === "object" && location.x && location.y) {
            return new Vector(location.x - this._centerLocation.x, location.y - this._centerLocation.y);
        }
        else {
            return false;
        }
    };
    Rectangle.prototype.getNearestDiagonalVector = function (location) {
        var curVector = this.getVectorFrom(location);
        if (curVector && this._centerLocation) {
            var resultIndex_1 = 0;
            var cos_1 = curVector.angleCos(this._diagnalVector[0]);
            this._diagnalVector.forEach(function (item, index) {
                if (index !== 0) {
                    var curCos = curVector.angleCos(item);
                    if (curCos > cos_1) {
                        cos_1 = curCos;
                        resultIndex_1 = index;
                    }
                }
            });
            return this._diagnalVector[resultIndex_1];
        }
        else {
            return false;
        }
    };
    return Rectangle;
}(Shape));
exports["default"] = Rectangle;
module.exports = exports["default"];
//# sourceMappingURL=Rectangle.js.map