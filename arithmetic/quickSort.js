/**
 * 写个快排，再来一次
 */

const array = [2,5,6,9,73,7,72,48,83,3, 5, 7, 73];

function quickSort(array, left, right) {
    if (left >=  right) {
        return;
    }
    // 取基准值
    const currValue = array[left];
    let leftIndex = left;
    let rightIndex = right;
    while(leftIndex < rightIndex) {
        // 从右侧找个比基准值小的值
        while(rightIndex > leftIndex) {
            if (currValue > array[rightIndex]) {
                array[leftIndex] = array[rightIndex];
                break;
            }
            rightIndex--;
        }
        // 左侧寻找一个比基准小的值
        while(rightIndex > leftIndex) {
            if (currValue < array[leftIndex]) {
                array[rightIndex] = array[leftIndex];
                break;
            }
            leftIndex++;
        }
    }
    array[leftIndex] = currValue;
    quickSort(array, left, leftIndex - 1);
    quickSort(array, leftIndex+1, right);
}

quickSort(array, 0, array.length - 1);
console.log(array);