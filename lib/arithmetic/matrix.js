"use strict";
/**
 * 给定一个有N×M的整型矩阵matrix和一个整数K，matrix每行每列都排好序了。
    实现一个函数，判断K是否在matrix中。

    核心在于创造判定条件：从右上角找
*/
var matrix = [
    [0, 1, 2, 5],
    [2, 3, 4, 7],
    [4, 4, 4, 8],
    [5, 7, 7, 9]
];
function findValue(matrix, value) {
    var x_index = 0;
    var y_index = matrix[0].length - 1;
    var isSearched = false;
    while (x_index < matrix.length && y_index < matrix[0].length) {
        if (matrix[x_index][y_index] > value) {
            y_index--;
        }
        else if (matrix[x_index][y_index] === value) {
            isSearched = true;
            break;
        }
        else {
            x_index++;
        }
    }
    if (isSearched) {
        return { x: x_index, y: y_index };
    }
    else {
        return false;
    }
}
var value = 4;
var result = findValue(matrix, value);
if (result) {
    console.log("".concat(value, "\u5728\u77E9\u9635\u7684\u7B2C").concat(result.x + 1, "\u884C\u7684\u7B2C").concat(result.y + 1, "\u5217"));
}
else {
    console.log("\u77E9\u9635\u4E2D\u5E76\u4E0D\u5B58\u5728".concat(value));
}
//# sourceMappingURL=matrix.js.map