"use strict";
var array = [2, 10, 3, 4, 5, 11, 10, 11, 20];
var set = new Set(array);
var obj = {};
set.forEach(function (item) {
    var key = Math.floor(item / 10);
    if (obj[key]) {
        sort(obj[key], item);
    }
    else {
        obj[key] = [item];
    }
});
var result = Object.keys(obj).reduce(function (prev, curr) { prev.push(obj[curr]); return prev; }, []);
console.log(result);
function sort(array, value) {
    for (var index_1 = 0; index_1 < array.length; index_1++) {
        if (array[index_1] >= value) {
            array.splice(index_1, 0, value);
            break;
        }
    }
    array.push(value);
}
//# sourceMappingURL=67.js.map