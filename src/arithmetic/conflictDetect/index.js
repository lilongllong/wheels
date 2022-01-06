const Circle =  require("./Circle");
const Rectangle = require("./Rectangle");
const Vector = require("./Vector");

exports.isJoined = function(rStart, rEnd, cLoc, cRadius)
{
    const circle = new Circle();
    circle.centerLocation = cLoc;
    circle.radius = cRadius;

    const rect = new Rectangle();
    rect.startPoint = rStart;
    rect.endPoint = rEnd;

    const vJoin = rect.getVectorFrom(cLoc).abs();
    const vNear = rect.getNearestDiagonalVector(cLoc).abs();
    const vResult = vJoin.minus(vNear);
    let u = 0;
    // circle cetroid in rect
    if (vResult.vector[0] < 0 && vResult.vector[1] < 0)
    {
        return true;
    }
    // 靠近 方框
    if (Math.abs(vResult.vector[0]) < cRadius && Math.abs(vResult.vector[1]) < cRadius)
    {
        u = Math.min(Math.max(vResult.vector[0], 0), Math.max(vResult.vector[1], 0));
        return u <= cRadius;
    }

    // 远离方框
    if (vResult.vector[0] > 0 || vResult.vector[1] > 0)
    {
        u = vResult.distance();
        return u <= cRadius;
    }
    return false;

}
