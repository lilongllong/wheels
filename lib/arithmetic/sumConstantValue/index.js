"use strict";
(function () {
    var array = [1, 2, 3, 2, 5, 6, 7, 8, 9];
    var sum = 8;
    var data = findSum(array, sum);
    console.log('data', data);
})();
function findSum(array, sum) {
    var newArr = array.map(function (item) { return sum - item; });
    var set = {};
    array.map(function (item) {
        if (set[item]) {
            set[item]++;
        }
        else {
            set[item] = 1;
        }
    });
    var count = 0;
    while (newArr.length > 0) {
        var data_1 = newArr.pop();
        if (set[data_1] && set[data_1] > 0) {
            count++;
            set[data_1]--;
            console.log(data_1, sum - data_1);
        }
    }
    return count;
}
//# sourceMappingURL=index.js.map