// console.log(getValue(10000, 100));

function getValue(n, m) {
    let currValue = 1;
    let length = 0;
    while(currValue <= n) {
        length++;
        if (length < m) {
            const nextValue = getNextValue(currValue, n);
            if (nextValue) {
                currValue = nextValue;
            } else {
                return -1;
            }
        } else {
            if (length === m) {
                return currValue;
            } else {
                return -2;
            }
        }
    }
}
function getNextValue(value, n) {
    const arr = value.toString().split('').map(item => parseInt(item));
    if (value * 10 <= n) {
        return value * 10;
    } else if (value + 1 <= n && arr[arr.length - 1] !== 9) {
        return value + 1;
    } else {        
        while(arr.length > 1) {
            console.log(arr);
            arr.pop();
            const last = parseInt(arr[arr.length - 1]);
            if (last !== 9) {
                const currValue = parseInt(arr.join(''));
                if (currValue + 1 <= n) {
                    return currValue + 1;
                }
            }
        }
       	return -1;
    }
}

function getValueByCount(m) {
    const array = ['A', 'G', 'C', 'T'];
    let result = '';
    for(let index = 0; index < m; index++) {
        result += array[Math.min(Math.floor(Math.random() * 4), 3)];
    }
    return result;
}

console.log(getValueByCount(80))
console.log(getValueByCount(90))