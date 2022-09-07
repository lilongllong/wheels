/** 数组局部翻转失败思路案例 */
/**
 * 代码题: 部分翻转
// 输入：
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const n = 3
// 输出：
[10, 7, 8, 9, 4, 5, 6, 1, 2, 3];

function reverse(arr, n) {

}
正确的思路是先将数组整体翻转，然后在按照limit 从尾部进行局部翻转
 * @param {*} arr
 * @param {*} limit
 * @returns
 */

const arrayReverse = (arr, limit) => {
  // 形成映射关下 index 和 groupIndex
  // index = 0  l - limit
  // 设置一个索引 g
  const l = arr.length;

  const findNextIndex = (arrIndex) => {
    const index = arrIndex % limit;
    const groupIndex = Math.ceil((arrIndex + 1) / limit);

    // 映射组 targetIndex 和 targetGroupIndex
    if (arrIndex >= (l - (l % limit))) {
        // 进入尾部
        console.log(arrIndex, "targetIndex", index);
        return index;
    }
    console.log(arrIndex, "targetIndex", l - groupIndex * limit + index);
    return l - groupIndex * limit + index;
  };
  let temp = arr[0];
  arr[0] = null;
  let nullIndex  = 0;
  let arrIndex = 0;
  let count = 0;
  while (count < l) {
    const resultIndex = findNextIndex(arrIndex);
    const temp1 = arr[resultIndex];
    if (temp1 === null && resultIndex < (l - 1)) {
        arr[resultIndex] = temp;
        temp = arr[resultIndex + 1];
        arr[resultIndex + 1] = null;
        count += 1;
        arrIndex = resultIndex + 1;
        nullIndex = arrIndex;
    } else {
        arrIndex = resultIndex;
        arr[resultIndex] = temp;
        temp = temp1;
        count += 1;
    }
  }
  console.log(temp, 'xx');
  if (temp) {
    arr[nullIndex] = temp;
  }
  return arr;
};

console.log(arrayReverse([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3));

const rightMap = (array, limit) => {
  // 首次交换
  const l = array.length;
  const reverseArr = (array, left, right) => {
    let index = left;
    while((index + 1) <= Math.floor((left + right + 1) / 2)) {
      const temp = array[index];
      array[index] = array[right - (index - left)];
      array[right - (index - left)] = temp;
      index ++;
    }
  }
  reverseArr(array, 0, l - 1);
  // 二次交换
  const leftedCount = l % limit;
  let index = 0;
  if (leftedCount) {
    reverseArr(array, 0, leftedCount - 1);
    index = leftedCount;
  }
  while(index < l) {
    reverseArr(array, index, index + limit -1);
    index += limit;
  }
  return array;
}
console.log(rightMap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));
