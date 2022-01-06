// 二进制减法

function add(a, b, decimal) {
    const aList = (a || '').split('');
    const bList = (b || '').split('');
    let indexA = aList.length - 1;
    let indexB = bList.length - 1;
    let temp = 0;
    let res = '';
    while (indexA >= 0 || indexB >= 0 || temp) {
        const sum = Number(aList[indexA] || 0) + Number(bList[indexB] || 0) + temp;
        temp = Math.floor(sum / decimal);
        res = String(sum % decimal) + res;
        indexA--;
        indexB--;
    }
    return res;
}

function addToDecimal(a, b) {
    const binary = add(a, b, 2).split('');
    let index = 0;
    let result = '0';
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



