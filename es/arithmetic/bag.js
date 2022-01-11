"use strict";
// 有 n 个重量个价值分别为 w_i, v_i 的物品。
// 从这些物品中选出总重量不超过 W 的物品，使其总价值最大。
// 示例 
// n w n:物品个数， W:标识总重
// 1 2 3 4 5 W_i 每个物品的总量
// 5 4 3 2 1 V_i 每个物品的价值
// 1、写个分解过程，得到递推公式（进阶版：伪码（包含逻辑和变量））
// 2、翻译代码
//     2.1 确定输入和输出
//     2.2 确定中间变量-参数和过渡变量
//     2.3 写方法-关注伪码逻辑部分的实现
//     2.4 依据逻辑，补充终止条件和剪枝条件
//     2.5 验证代码运行，排除错误（终止条件和剪枝条件导致循环）
//     2.6 优化代码-优化空间；节省运算（*尽早剪枝，*计算复用，去掉多余运算-不可能出现的运算）
// 3、*题目扩展-结果数据表现改动，*增加条件-剪枝条件和终止条件改变，内容扩充-题目增加难度，需要其他算法配合
//     3.1 题目扩展-结果数据表现改动，先关注主逻辑的转换，以此替换其他的
//     3.2 增加条件-剪枝条件和终止条件改变，直接修改终止条件和剪枝条件
/**
 * 分解过程：
 * 选这第i个物品a，W_a, V_a 的选择结果有两种: 选 or 不选
 * 选的结果：V1 = V_a + V_余(i + 1, W - W_a);
 * 不选的结果：V0 = 0 + V_余(i + 1, W);
 * V = Max(v1, v0);
 */
// 存储结果：i之后所有物品在W_BAG的限制下的最大价值
var N_BAG = 6;
var W_BAG = 20;
var W = [1, 2, 3, 4, 5, 6];
var V = [6, 5, 4, 3, 2, 1];
function MaxValue(i, weight) {
    if (weight === 0) {
        return [];
    }
    if (i >= N_BAG) {
        return [];
    }
    // 取i个物品
    var V_i = V[i];
    var W_i = W[i];
    if (V_i && W_i) {
        var selected = [i];
        var v_selected = V_i;
        var unselected = [];
        var v_unselected = 0;
        if (W_i > weight) {
            selected = [];
            v_selected = 0;
        }
        else {
            selected = selected.concat(MaxValue(i + 1, weight - W_i));
            v_selected += selected.reduce(function (prev, curr) { return prev + curr; }, 0);
        }
        unselected = unselected.concat(MaxValue(i + 1, weight));
        v_unselected += unselected.reduce(function (prev, curr) { return prev + curr; }, 0);
        return v_selected >= v_unselected ? selected : unselected;
    }
    else {
        return [];
    }
}
console.log(MaxValue(0, W_BAG).map(function (item) { return "".concat(W[item], "_").concat(V[item]); }));
// console.log(sum, cache);
// console.log(DP);
//# sourceMappingURL=bag.js.map