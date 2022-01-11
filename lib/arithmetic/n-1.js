"use strict";
/**
给定一个十进制整数N，写下从1开始到N的所有正整数，然后数一数其中出现的所有的“1”的个数。
例如 ： N=2,写下1，2，这样只出现了一个1 N=12,写下1，2，3，4，5，6，7，8，9，10，11，12。这样1的个数是5
问题： 给出N，返回里面出现1的个数
*/
/**
 * 分析 234567
 * 对于个位数，C(1) = 1 * 10^0
 * 对于十位数，C(2) = 1 * 10^1 + 10 * C(1)
 * 对于百位数，C(3) = 1 * 10^2 + 10 * C(2)
 * 对于n位数, C(n) = 1 * 10^(n-1) + 10 * C(n-1)
 * 从n + 1位 到 9999(n)的分割统计，
 * 若当前位数是k, 则其附属位数是 (k-1) * C(n-1) + 1
 * 则递归
 * C(n-1)
 */
var cache = [];
function C(k) {
    if (k === 1) {
        return 1;
    }
    else {
        var result_1 = cache[k] ? cache[k] : 1 * Math.pow(10, k - 1) + 10 * C(k - 1);
        cache[k] = result_1;
        return result_1;
    }
}
function F(n) {
    var k = String(n).length;
    if (k === 1) {
        return n >= 1 ? 1 : 0;
    }
    var m = parseInt(String(n).charAt(0));
    var remainder = n - m * Math.pow(10, k - 1);
    if (m === 1) {
        return (remainder + 1) + C(k - 1) + F(remainder);
    }
    else {
        return Math.pow(10, k - 1) + m * C(k - 1) + F(remainder);
    }
}
console.log(F(9), 1);
console.log(F(100), C(2), 20);
console.log(F(85), 12 + 7);
console.log(F(999), C(3), 300);
//# sourceMappingURL=n-1.js.map