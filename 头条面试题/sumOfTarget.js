// 题目：从原数组中取M个使其和为target

const tempA = [1,3,4,5,2,6,8,9,7];
const target = 17;
const m = 4;
tempA.sort((a,b) => a - b);
var results = [];

function findSumN(nums, m, target, result, results) {
    if (m > nums.length || target < nums[0] * m || target > nums[nums.length - 1] * m ) {
        return;
    }
    
    if (m === 2) {
        let left = 0;
        let right = nums.length - 1;
        while(left < right) {
            const sum = nums[left] + nums[right];
            if (sum === target) {
                results.push(result.concat([nums[left], nums[right]]));
                while(left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while(left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else {
                if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    } else {
        for (let i = 0; i < nums.length - m + 1; i++) {
            if (i === 0 || (i > 0 && nums[i - 1] !== nums[i])) {
                findSumN(nums.slice(i + 1), m - 1, target - nums[i], result.concat([nums[i]]), results);
            }
        }
    }
}

findSumN(tempA, m, target, [], results);
console.log(results);