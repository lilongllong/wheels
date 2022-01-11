"use strict";
var array = [2, 7, 11, 15];
var target = 13;
function getIndex(array, target) {
    var obj = {};
    for (var index_1 = 0; index_1 < array.length; index_1++) {
        var item = array[index_1];
        if (item <= target) {
            if (obj[item] !== undefined) {
                return [obj[item], index_1];
            }
            else {
                obj[target - item] = index_1;
            }
        }
    }
    return false;
}
console.log(getIndex(array, target));
//# sourceMappingURL=86.js.map