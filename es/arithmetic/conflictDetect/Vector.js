"use strict";
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        this._startPoint = null;
        this._endPoint = null;
        this._vector = null;
        if (x !== null && y !== null) {
            this._startPoint = {
                x: 0,
                y: 0
            };
            this._endPoint = {
                x: x,
                y: y
            };
            this._vector = {
                x: x,
                y: y
            };
        }
    }
    Object.defineProperty(Vector.prototype, "startPoint", {
        get: function () {
            return this._startPoint ? [this._startPoint.x, this._startPoint.y] : null;
        },
        set: function (value) {
            if (Array.isArray(value) && value.length >= 2) {
                this._startPoint = {
                    x: value[0],
                    y: value[1]
                };
                this._updateVector();
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "endPoint", {
        get: function () {
            return this._endPoint ? [this._endPoint.x, this._endPoint.y] : null;
        },
        set: function (value) {
            if (Array.isArray(value) && value.length >= 2) {
                this._endPoint = {
                    x: value[0],
                    y: value[1]
                };
                this._updateVector();
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Vector.prototype._updateVector = function () {
        if (this._endPoint && this._startPoint) {
            this._vector = {
                x: this._endPoint.x - this._startPoint.x,
                y: this._endPoint.y - this._startPoint.y
            };
        }
        else {
            this._vector = null;
        }
    };
    Object.defineProperty(Vector.prototype, "vector", {
        get: function () {
            return this._vector ? [this._vector.x, this._vector.y] : null;
        },
        enumerable: false,
        configurable: true
    });
    Vector.prototype.plus = function (vector) {
        if (vector instanceof Vector) {
            return new Vector(this._vector.x + vector.vector[0], this._vector.y + vector.vector[1]);
        }
        else {
            throw new Error("input must be a Vector object.");
        }
    };
    Vector.prototype.minus = function (vector) {
        if (vector instanceof Vector) {
            return new Vector(this._vector.x - vector.vector[0], this._vector.y - vector.vector[1]);
        }
        else {
            throw new Error("input must be a Vector object.");
        }
    };
    Vector.prototype.distance = function (vector) {
        if (vector === void 0) { vector = null; }
        if (vector === null) {
            // calculate it's distance
            return Math.sqrt(Math.pow(this._vector.x, 2) + Math.pow(this._vector.y, 2));
        }
        else {
            // calculate vector's distance
            return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        }
    };
    Vector.prototype.angleCos = function (vector) {
        if (vector) {
            var a_1 = this.distance();
            var b_1 = this.distance(vector);
            var ab = this._vector.x * vector.x + this._vector.y * vector.y;
            return a_1 * b_1 !== 0 ? ab / (a_1 * b_1) : 1; // assum 1
        }
        else {
            return false;
        }
    };
    Vector.prototype.abs = function (vector) {
        if (vector) {
            return new Vector(Math.abs(vector.x), Math.abs(vector.y));
        }
        else {
            return new Vector(Math.abs(this._vector.x), Math.abs(this._vector.y));
        }
    };
    return Vector;
}());
exports["default"] = Vector;
module.exports = exports["default"];
//# sourceMappingURL=Vector.js.map