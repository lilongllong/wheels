import moment from 'moment';
// input 是一个二维时间数组，target 也是一个二维时间数组。二维时间数组里的时间段可以是不连续的
// 写一个 function 判断：input 里的时间段，是否完全覆盖了 target 里的时间段; 如果完全覆盖了，return true; 否则 return false
// 例如：
const inputValue = [
  ['2022-06-21 17:56:37', '2022-06-29 17:56:37'],
  ['2022-06-28 17:56:37', '2022-06-30 17:56:37'],
];
const targetValue = [
  ['2022-06-21 17:56:38', '2022-06-28 17:56:37'],
  ['2022-06-28 17:56:37', '2022-06-30 17:56:37'],
];
const compareTime = (input: string[][], target: string[][]) => {
  const mergeOneToOne = (time1: number[], time2: number[]) => {
    return [Math.min(time1[0], time2[0]), Math.max(time1[1], time2[1])];
  };
  const mergeOneToArray = (times: number[][], time: number[]) => {
    let isMerged = false;
    let index = 0;
    while (!isMerged && index < times.length) {
      const element = times[index];
      if ((element[0] - time[1]) * (element[1] - time[0]) <= 0) {
        // 判断相交
        isMerged = true;
        times[index] = mergeOneToOne(times[index], element);
      }
      index++;
    }
    if (!isMerged) {
      times.push(time);
    }
    return isMerged;
  };
  const mergeTimeAndNumber = (value: string[][]) => {
    const times = (value || []).map(([start, end]) => [moment(start).valueOf(), moment(end).valueOf()]);
    let index = 0;
    let result: number[][] = [];
    while (index < value.length) {
      const isMerged = mergeOneToArray(result, times[index]);
      if (isMerged) {
        // 当前循环需要merge一次
        result = result.reduce((targetTime, curr) => {
          mergeOneToArray(targetTime, curr);
          return targetTime;
        }, [] as number[][]);
      }
      index++;
    }
    return result;
  };

  const formatInput = mergeTimeAndNumber(input);
  const formatTarget = mergeTimeAndNumber(target);
  console.log(formatInput, formatTarget);

  // 检查每一个target是否在input中
  let isHaveOutTime = false;
  for (const [start, end] of formatTarget) {
    let isContains = false;
    for (const [start2, end2] of formatInput) {
      if (start >= start2 && end <= end2) {
        isContains = true;
        break;
      }
    }
    if (!isContains) {
      isHaveOutTime = true;
      break;
    }
  }
  return !isHaveOutTime;
};
console.log('xxxx', compareTime(inputValue, targetValue));
