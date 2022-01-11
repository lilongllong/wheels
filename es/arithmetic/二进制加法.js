"use strict";
// 二进制减法
function add(a, b, decimal) {
    var aList = (a || '').split('');
    var bList = (b || '').split('');
    var indexA = aList.length - 1;
    var indexB = bList.length - 1;
    var temp = 0;
    var res = '';
    while (indexA >= 0 || indexB >= 0 || temp) {
        var sum_1 = Number(aList[indexA] || 0) + Number(bList[indexB] || 0) + temp;
        temp = Math.floor(sum_1 / decimal);
        res = String(sum_1 % decimal) + res;
        indexA--;
        indexB--;
    }
    return res;
}
function addToDecimal(a, b) {
    var binary = add(a, b, 2).split('');
    var index = 0;
    var result = '0';
    while (index <= binary.length - 1) {
        result = add(add(result, result, 10), binary[index], 10);
        index++;
    }
    return result;
}
console.log(addToDecimal('', ''));
console.log(addToDecimal('0', '0'));
console.log(addToDecimal('11', '111'));
console.log(addToDecimal('101', '1101'));
console.log(addToDecimal('101001001010010011010100101010010010010100101', '10010100100101001001010010010100100101001010010101010010000011'));
//# sourceMappingURL=%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%8A%A0%E6%B3%95.js.map