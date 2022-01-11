"use strict";
var Circle = require("./Circle");
var Rectangle = require("./Rectangle");
var Vector = require("./Vector");
exports.isJoined = function (rStart, rEnd, cLoc, cRadius) {
    var circle = new Circle();
    circle.centerLocation = cLoc;
    circle.radius = cRadius;
    var rect = new Rectangle();
    rect.startPoint = rStart;
    rect.endPoint = rEnd;
    var vJoin = rect.getVectorFrom(cLoc).abs();
    var vNear = rect.getNearestDiagonalVector(cLoc).abs();
    var vResult = vJoin.minus(vNear);
    var u = 0;
    // circle cetroid in rect
    if (vResult.vector[0] < 0 && vResult.vector[1] < 0) {
        return true;
    }
    // 靠近 方框
    if (Math.abs(vResult.vector[0]) < cRadius && Math.abs(vResult.vector[1]) < cRadius) {
        u = Math.min(Math.max(vResult.vector[0], 0), Math.max(vResult.vector[1], 0));
        return u <= cRadius;
    }
    // 远离方框
    if (vResult.vector[0] > 0 || vResult.vector[1] > 0) {
        u = vResult.distance();
        return u <= cRadius;
    }
    return false;
};
//# sourceMappingURL=index.js.map