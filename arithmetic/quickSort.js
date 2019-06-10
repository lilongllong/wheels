/**
 * 写个快排
 */

const array = [2,5,6,9,73,7,72,48,83,3];

function quickSort(array, left, right) {
    if (right - left < 1) return;
    if (right - left === 1) {
        if (array[left] > array[right]) {
            const temp = array[left];
            array[left] = array[right];
            array[right] = temp;
        }
        return;
    }
    const midValue = array[Math.ceil((left + right) / 2)];
    let leftIndex = left;
    let rightIndex = right;
    while(leftIndex < rightIndex) {
        let bigger = null;
        while(leftIndex < rightIndex) {
            if (array[leftIndex] < midValue) {
                leftIndex++;
            } else {
                bigger = leftIndex;
                leftIndex++;
                break;
            } 
        }
        let less = null;
        while(leftIndex < rightIndex) {
            if (array[rightIndex] > midValue) {
                rightIndex--;
            } else {
                less = rightIndex;
                rightIndex --;
                break;
            } 
        }
        if (bigger !== null && less !== null) {
            const temp = array[bigger];
            array[bigger] = array[less];
            array[less] = temp;
        } else if (bigger !== null || less !== null) {
            if (less) {
                quickSort(array, left, less);
                quickSort(array, less + 1, right);
            } else {
                quickSort(array, left, bigger - 1);
                quickSort(array, bigger, right);
            }
        } else {
            quickSort(array, left, array[leftIndex] >= midValue ? leftIndex - 1 : leftIndex);
            quickSort(array, array[leftIndex] >= midValue ? leftIndex : leftIndex + 1, right);
        }
    }
}
quickSort(array, 0, array.length - 1);
console.log(array);