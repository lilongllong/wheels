const array = [1, -1, 3, 5, -2, 5, 10, -20, 1, 3];
// 第一种解法

function getMaxIndex(array) {
    let max = Number.MIN_VALUE;
    let startIndex = 0;
    array.map((item, index) => {
        const newMax = max + item;
        if (newMax < item) {
            // 重置求和
            startIndex = index;
            max = item;
        } else if (newMax >= max) {
            max = newMax;
        }
    });
}