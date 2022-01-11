"use strict";
// 题目：从原数组中取M个使其和为target
var tempA = [1, 3, 4, 5, 2, 6, 8, 9, 7];
var target = 17;
var m = 4;
tempA.sort(function (a, b) { return a - b; });
var results = [];
function findSumN(nums, m, target, result, results) {
    if (m > nums.length || target < nums[0] * m || target > nums[nums.length - 1] * m) {
        return;
    }
    if (m === 2) {
        var left = 0;
        var right = nums.length - 1;
        while (left < right) {
            var sum_1 = nums[left] + nums[right];
            if (sum_1 === target) {
                results.push(result.concat([nums[left], nums[right]]));
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            }
            else {
                if (sum_1 < target) {
                    left++;
                }
                else {
                    right--;
                }
            }
        }
    }
    else {
        for (var i_1 = 0; i_1 < nums.length - m + 1; i_1++) {
            if (i_1 === 0 || (i_1 > 0 && nums[i_1 - 1] !== nums[i_1])) {
                findSumN(nums.slice(i_1 + 1), m - 1, target - nums[i_1], result.concat([nums[i_1]]), results);
            }
        }
    }
}
findSumN(tempA, m, target, [], results);
console.log(results);
//# sourceMappingURL=sumOfTarget.js.map