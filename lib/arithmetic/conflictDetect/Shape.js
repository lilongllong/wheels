"use strict";
var Shape = /** @class */ (function () {
    function Shape(args) {
        if (args) {
            this._type = args.type || "";
            this._centerLocation = args.centerLocation;
        }
        else {
            this._type = null;
            this._centerLocation = null;
        }
    }
    Object.defineProperty(Shape.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "centerLocation", {
        get: function () {
            return this._centerLocation;
        },
        enumerable: false,
        configurable: true
    });
    return Shape;
}());
exports["default"] = Shape;
module.exports = exports["default"];
//# sourceMappingURL=Shape.js.map