"use strict";
// 括号匹配,n对括号，所有可能出现的结果总数
/**
 *
 * @param {*} left : 左括号个数
 * @param {*} right :又括号个数
 */
function consumeall(left, right) {
    if (left < 0 || right < 0) {
        return 0;
    }
    else if (left > right) {
        return 0;
    }
    else if (left === 0 || right === 0) {
        return 1;
    }
    else {
        return consumeall(left - 1, right) + consumeall(left, right - 1);
    }
}
// console.log(consumeall(1, 1));
// console.log(consumeall(2, 2));
// 简单操作符运算
function operation(str) {
    var result = [];
    var lastIndex = 0;
    var currIndex = 0;
    while (currIndex < str.length) {
        if ('+-*/'.indexOf(str.charAt(currIndex)) > -1) {
            var value_1 = str.slice(lastIndex, currIndex);
            var oper = str.charAt(currIndex);
            if (value_1.length) {
                result.push(value_1);
            }
            result.push(oper);
            currIndex++;
            lastIndex = currIndex;
        }
        else {
            currIndex++;
        }
    }
    if (lastIndex < currIndex) {
        result.push(str.slice(lastIndex, currIndex));
    }
    // 数据处理结束
    var plusResult = [];
    var index = result.length - 1;
    while (index > 0) {
        while (index >= 0 && '*/'.indexOf(result[index]) < 0) {
            plusResult.unshift(result[index]);
            index--;
        }
        if (index >= 0) {
            if (result[index] === '*') {
                var left = Number(result[index - 1]) / Number(plusResult.shift());
                plusResult.unshift(left);
            }
            else {
                var left = Number(result[index - 1]) * Number(plusResult.shift());
                plusResult.unshift(left);
            }
            index -= 2;
        }
    }
    // 乘除处理结束
    while (plusResult.length > 2) {
        var left = plusResult.pop();
        var oper = plusResult.pop();
        var right = plusResult.pop();
        if (oper === '-') {
            plusResult.push(Number(left) + Number(right));
        }
        else {
            plusResult.push(Number(left) - Number(right));
        }
    }
    return plusResult.pop();
}
console.log(parseInt(operation('2.1+3/4+1*2')));
console.log(parseInt(operation('2.1+3/4.1-1/2-1')));
console.log(parseInt(operation('2.1+3/4.1-1/2-1/388.1*21.4')));
console.log(parseInt(operation('2.1+3/4.1-1/2-1/388.1*21.4+3772*2834')));
console.log(parseInt(operation('2.1+3/4.1-1/2-1/388.1*21.4+3772*2834-26.1')));
//# sourceMappingURL=bracket.js.map