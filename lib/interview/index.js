"use strict";
// console.log(getValue(10000, 100));
function getValue(n, m) {
    var currValue = 1;
    var length = 0;
    while (currValue <= n) {
        length++;
        if (length < m) {
            var nextValue = getNextValue(currValue, n);
            if (nextValue) {
                currValue = nextValue;
            }
            else {
                return -1;
            }
        }
        else {
            if (length === m) {
                return currValue;
            }
            else {
                return -2;
            }
        }
    }
}
function getNextValue(value, n) {
    var arr = value.toString().split('').map(function (item) { return parseInt(item); });
    if (value * 10 <= n) {
        return value * 10;
    }
    else if (value + 1 <= n && arr[arr.length - 1] !== 9) {
        return value + 1;
    }
    else {
        while (arr.length > 1) {
            console.log(arr);
            arr.pop();
            var last = parseInt(arr[arr.length - 1]);
            if (last !== 9) {
                var currValue = parseInt(arr.join(''));
                if (currValue + 1 <= n) {
                    return currValue + 1;
                }
            }
        }
        return -1;
    }
}
function getValueByCount(m) {
    var array = ['A', 'G', 'C', 'T'];
    var result = '';
    for (var index_1 = 0; index_1 < m; index_1++) {
        result += array[Math.min(Math.floor(Math.random() * 4), 3)];
    }
    return result;
}
console.log(getValueByCount(80));
console.log(getValueByCount(90));
//# sourceMappingURL=index.js.map