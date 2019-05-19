

/**
 * 问题分解过程：
 * 分解：第一步： 取一个硬币，coins = [1, 3, 5]，first = a  < coins，
 *      检查目标值 sum - a > 0, min(C f(sum - a)) 
 * 第n步: 去一个硬币，coins = [1, 3, 5] a < coins
 *      检查目标值 sum(n) - coins-n > 0, min(C f(sum - a)) 
 */

// 目标结果叫做使用硬币数

 function minCoins(coins, sum) {
    // 最小硬币数
    let coin_number = Number.MAX_SAFE_INTEGER;
    // 新加入的硬币数组
    let curr_coins = [];
    (coins || []).forEach(item => {
        if (sum - item > 0) {
            // 分解
            const next = minCoins(coins, sum - item);
            const nextCoinNumber = next.length + 1;
            if (coin_number > nextCoinNumber) {
                coin_number = nextCoinNumber;
                curr_coins = [ item ].concat(next);
            }
        } else if (sum - item === 0) {
            // 终止条件
            if (coin_number > 1) {
                coin_number = 1;
                curr_coins = [ item ];
            }
        } else {
            // sum < a 终止条件
            // 不进行任何处理
        }
    });
    return curr_coins;
 }
 const coins = [1, 3, 5];

 console.log(minCoins(coins, 1));
 console.log(minCoins(coins, 3));
 console.log(minCoins(coins, 13));


 


