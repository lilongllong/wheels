/**
 * 题目描述：
 * 从许多大文件中提取出现频率最高的100个单词
 * 可能涉及倒排索引，排序和
 */

// 最小堆
// const files = [9, 3, 7, 6, 5, 1, 10, 2, 8, 12, 40, 90, 100, 120, 500, 35];

function findParent(index) {
    if (!index) return -1;
    const n = findNLayer(index);
    const n_location = index - Math.pow(2, n) + 2;
    // index  === 2^n - 2 + 该列第N个位置; 
    parent = Math.pow(2, n - 1) - 2 + Math.ceil(n_location / 2);
    return parent;
}

function findChildren(index) {
    const n = findNLayer(index);
    const n_location = index - Math.pow(2, n) + 2;
    const leftChild = Math.pow(2, n+1) - 2 + (n_location - 1) * 2 + 1;
    const rightChild = Math.pow(2, n+1) - 2 + (n_location - 1) * 2 + 2;
    return [leftChild, rightChild];
}

// 确定二叉树层级
function findNLayer(index) {
    let result = 0;
    let target = 1;
    while (target < index + 1) {
        target += Math.pow(2, (result + 1));
        result += 1;
    }
    return result;
}

function flatTree(treeArray, index) {
    const maxLength =  treeArray.length;
    const children = findChildren(index).filter(item => item < maxLength);
    if (children.length === 0) return;
    if (children.length === 1 && treeArray[children[0]] < treeArray[index]) {
        const temp = treeArray[children[0]]
        treeArray[children[0]] = treeArray[index];
        treeArray[index] = temp;
        flatTree(treeArray, children[0]);
    }
    if (children.length === 2 && treeArray[index] > Math.min(treeArray[children[0]], treeArray[children[1]])) {
        if (treeArray[children[0]] >= treeArray[children[1]]) {
            const temp = treeArray[children[1]];
            treeArray[children[1]] = treeArray[index];
            treeArray[index] = temp;
            flatTree(treeArray, children[1]);
        } else {
            const temp = treeArray[children[0]];
            treeArray[children[0]] = treeArray[index];
            treeArray[index] = temp;
            return flatTree(treeArray, children[0]);
        }
    }
}

function createTree(value) {
    let treeArray = value;
    const maxLength = treeArray.length;
    let index = findParent(treeArray.length - 1); // 干扰特别大
    while(index >= 0) {
        flatTree(treeArray, maxLength);
        index --;
    }
    return treeArray;
}

function maxTop(top, files) {
    if (top == 1) {
        // 变成寻找最大值
        return files.reduce((prev, curr) => prev - curr > 0 ? prev : curr, Number.MIN_VALUE);
    } else if (top === files.length) {
        // 寻找最小值
        return files.reduce((prev, curr) => prev - curr > 0 ? curr : prev, Number.MAX_VALUE);
    } else {
        const ordered = files.sort((a, b) => b - a);
        console.log(files.length);
        return ordered[top-1];
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
const fs = require('fs');
// fs.writeFile("./input.txt", result.join(','), function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// }); 
var text = fs.readFileSync('./input.txt', 'utf8');
const files = text.split(',').map(item => parseInt(item));
console.log(maxTop(40020, files));


function KthLargest(k, )