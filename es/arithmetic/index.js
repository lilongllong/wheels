"use strict";
var array = [1, -1, 3, 5, -2, 5, 10, -20, 1, 3];
// 第一种解法
function getMaxIndex(array) {
    var max = Number.MIN_VALUE;
    var startIndex = 0;
    array.map(function (item, index) {
        var newMax = max + item;
        if (newMax < item) {
            // 重置求和
            startIndex = index;
            max = item;
        }
        else if (newMax >= max) {
            max = newMax;
        }
    });
}
//# sourceMappingURL=index.js.map