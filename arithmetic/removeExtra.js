// 题目
/*
有一个大数组,var a = ['1', '2', '3', ...];a的长度是100,内容填充随机整数的字符串.请先构造此数组a,然后设计一个算法将其内容去重
*/

function normalize(arr) {
    if (arr && Array.isArray(arr)) {
        const result = arr.slice(0);
        const map = {};
        for (let i = arr.length; i >= 0; i--) {
            if (result[i] in map) {
                result.splice(i, 1);
            } else {
                map[result[i]] = true;
            }
        }
        return result;
    }
    return null;
}

function fillArray(length, start, end) {
    const result = [];
    const valueStart = (start !== null && start !== undefined) ? start : 1;
    const valueEnd = (end !== null && end !== undefined) ? end : 100;
    if (valueStart >= valueEnd) {
        valueEnd = valueStart + 100;
    }
    const width = valueEnd - valueStart;
    for (let i = length; i >= 0; i--) {
        result.push((Math.floor(Math.random() * width) + valueStart).toString());
    }
    return result;
}

const result = normalize(fillArray(100, 0, 100).sort((a, b) => a - b));
console.log(result);