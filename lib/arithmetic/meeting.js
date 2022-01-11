"use strict";
/**
 * @description: 会议室占用 有效时间是8到9点，一共13个小时
 * @description: 输入 '8, 11' 开始时间和结束时间
 * @description: 输出是 ['8,11', '12, 14']
 * @description: 最大化合理使用会议室，同等使用率方法，该会议室开始越早越好，时间越长越好
 */
var input = ['8,10', '9,11', '14,16', '14,17', '17,17', '18,21'];
var TIME_COUNT = 14;
// F(13, input) = Max(F(remains(length - input[0].last), input.slice(1)), F(13, input.slice(1)))
// F(0, input) = return { result: null, sum: 0 }
// F(remains, input.length == 0) = return { result: null, sum: 0 }
function formateTime(input) {
    var value = input.map(function (item) { return ({ end: parseInt(item.split(',')[1]) - 7, start: parseInt(item.split(',')[0]) - 7 }); });
    value.sort(function (a, b) { return a.start - b.start; });
    return value;
}
function findBetterByCondition(a, b) {
    var result = a;
    if (a.paths.length > 0 && b.paths.length > 0) {
        if (a.paths.length === b.paths.length) {
            var index_1 = 0;
            while (index_1 < a.paths.length) {
                if (a.paths[index_1].start > b.paths[index_1].start) {
                    result = b;
                    break;
                }
                index_1++;
            }
        }
        else {
            return a.paths.length > b.paths.length ? b : a;
        }
    }
    return result;
}
function scheduleMeettingF(times, arrays) {
    // 分解，分解成更小范围的问题，寻求方案，同时假设已知子范围解决方案，对最终方案进行剪枝
    // 对于每个团队的情况，只有入选和不入选
    if (times && times > 0 && arrays && arrays.length > 0) {
        var target_1 = arrays[0];
        if (target_1.start > TIME_COUNT - times && target_1.end <= TIME_COUNT) {
            var notSelected = scheduleMeettingF(times, arrays.slice(1));
            var selectedResChildren = scheduleMeettingF(TIME_COUNT - target_1.end, arrays.slice(1));
            var select = {
                value: selectedResChildren.value + target_1.end - target_1.start + 1,
                paths: [target_1].concat(selectedResChildren.paths)
            };
            if (notSelected.value > select.value) {
                return notSelected;
            }
            else if (notSelected.value === select.value) {
                // 条件是 该会议室开始越早越好 时间越长越好,
                return findBetterByCondition(select, notSelected);
            }
            else {
                return select;
            }
        }
        else {
            return scheduleMeettingF(times, arrays.slice(1));
        }
    }
    else {
        return { value: 0, paths: [] };
    }
}
var result = scheduleMeettingF(14, formateTime(input));
result.paths = result.paths.map(function (item) { return ({ start: item.start + 7, end: item.end + 7 }); });
console.log(result);
//# sourceMappingURL=meeting.js.map