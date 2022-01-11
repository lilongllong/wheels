"use strict";
function add(a, b) {
    if (a !== "" && b !== "") {
        var aArr = a.split("");
        var bArr = b.split("");
        var result_1 = [];
        var length_1 = Math.max(aArr.length, bArr.length);
        var nextAdd = 0;
        while (length_1 > 0) {
            var aItem = 0;
            var bItem = 0;
            if (aArr.length > 0) {
                aItem = aArr.pop();
            }
            if (bArr.length > 0) {
                bItem = bArr.pop();
            }
            var item = (parseInt(aItem) + parseInt(bItem) + nextAdd) % 10;
            nextAdd = parseInt(((parseInt(aItem) + parseInt(bItem) + nextAdd) - item) / 10);
            result_1.push(item);
            length_1--;
        }
        if (nextAdd > 0) {
            result_1.push(nextAdd);
        }
        var data_1 = [];
        // 字符串反转
        while (result_1.length > 0) {
            data_1.push(result_1.pop());
        }
        return data_1.reduce(function (prev, curr) { return prev.concat(curr); }, "");
    }
}
function getInteger(value) {
    if (value && value !== "") {
        var result_2 = parseInt(value);
        return isNaN(result_2) ? false : result_2;
    }
    return false;
}
function handleAddAction() {
    var a = document.getElementById('a-input').value;
    var b = document.getElementById('b-input').value;
    if (getInteger(a) !== false && getInteger(b) !== false) {
        if (a < 0 || b < 0) {
            alert('a or b not be a negative number!');
        }
        else {
            // add a, b
            var result_3 = add(a, b);
            var resultStr = 'a(' + a + ') + b(' + b + ') = ' + result_3;
            alert(resultStr);
        }
    }
    else {
        alert('a or b is not a interger');
    }
}
(function () {
    document.getElementById('submit').addEventListener('click', handleAddAction);
})();
//# sourceMappingURL=index.js.map