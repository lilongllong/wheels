"use strict";
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', function (line) {
    var tokens = parseInt(line);
    console.log(Total(tokens) % BigInt(1000000007));
});
function Total(t) {
    var n = t / 2;
    if (n <= 1) {
        return 1;
    }
    var h = new Array(n + 1);
    h[0] = h[1] = BigInt(1); //h(0)和h(1)
    for (var i_1 = 2; i_1 <= n; i_1++) {
        h[i_1] = BigInt(0);
        for (var j = 0; j < i_1; j++) //根据递归式计算 h(i)= h(0)*h(i-1)+h(1)*h(i-2) + ... + h(i-1)h(0)
            h[i_1] += h[j] * h[i_1 - 1 - j];
    }
    var result = h[n]; //保存结果
    delete h; //注意释放空间
    return result;
}
//# sourceMappingURL=question1.js.map