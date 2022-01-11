"use strict";
/**
 * 题目描述：
 * 从许多大文件中提取出现频率最高的100个单词
 * 可能涉及倒排索引，排序和
 */
// 最小堆
// const files = [9, 3, 7, 6, 5, 1, 10, 2, 8, 12, 40, 90, 100, 120, 500, 35];
function findParent(index) {
    if (!index)
        return -1;
    var n = findNLayer(index);
    var n_location = index - Math.pow(2, n) + 2;
    // index  === 2^n - 2 + 该列第N个位置; 
    parent = Math.pow(2, n - 1) - 2 + Math.ceil(n_location / 2);
    return parent;
}
function findChildren(index) {
    var n = findNLayer(index);
    var n_location = index - Math.pow(2, n) + 2;
    var leftChild = Math.pow(2, n + 1) - 2 + (n_location - 1) * 2 + 1;
    var rightChild = Math.pow(2, n + 1) - 2 + (n_location - 1) * 2 + 2;
    return [leftChild, rightChild];
}
// 确定二叉树层级
function findNLayer(index) {
    var result = 0;
    var target = 1;
    while (target < index + 1) {
        target += Math.pow(2, (result + 1));
        result += 1;
    }
    return result;
}
function flatTree(treeArray, index) {
    var maxLength = treeArray.length;
    var children = findChildren(index).filter(function (item) { return item < maxLength; });
    if (children.length === 0)
        return;
    if (children.length === 1 && treeArray[children[0]] < treeArray[index]) {
        var temp = treeArray[children[0]];
        treeArray[children[0]] = treeArray[index];
        treeArray[index] = temp;
        flatTree(treeArray, children[0]);
    }
    if (children.length === 2 && treeArray[index] > Math.min(treeArray[children[0]], treeArray[children[1]])) {
        if (treeArray[children[0]] >= treeArray[children[1]]) {
            var temp = treeArray[children[1]];
            treeArray[children[1]] = treeArray[index];
            treeArray[index] = temp;
            flatTree(treeArray, children[1]);
        }
        else {
            var temp = treeArray[children[0]];
            treeArray[children[0]] = treeArray[index];
            treeArray[index] = temp;
            return flatTree(treeArray, children[0]);
        }
    }
}
function createTree(value) {
    var treeArray = value;
    var maxLength = treeArray.length;
    var index = findParent(treeArray.length - 1); // 干扰特别大
    while (index >= 0) {
        flatTree(treeArray, maxLength);
        index--;
    }
    return treeArray;
}
function maxTop(top, files) {
    if (top == 1) {
        // 变成寻找最大值
        return files.reduce(function (prev, curr) { return prev - curr > 0 ? prev : curr; }, Number.MIN_VALUE);
    }
    else if (top === files.length) {
        // 寻找最小值
        return files.reduce(function (prev, curr) { return prev - curr > 0 ? curr : prev; }, Number.MAX_VALUE);
    }
    else {
        var ordered = files.sort(function (a, b) { return b - a; });
        console.log(files.length);
        return ordered[top - 1];
        //     const minTree = createTree(files.slice(0, top));
        //     files.slice(top).forEach(item => {
        //         if (minTree[0] < item) {
        //             minTree[0] = item;
        //             flatTree(minTree, 0);
        //         }
        //     });
        //     return minTree[0];
    }
}
// const result = [];
// for(let i = 0; i < 100000; i++) {
//     result.push(Math.ceil(Math.random() * 100));
// }
var fs = require('fs');
// fs.writeFile("./input.txt", result.join(','), function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// }); 
var text = fs.readFileSync('./input.txt', 'utf8');
var files = text.split(',').map(function (item) { return parseInt(item); });
console.log(maxTop(40020, files));
//# sourceMappingURL=fileSearch.js.map