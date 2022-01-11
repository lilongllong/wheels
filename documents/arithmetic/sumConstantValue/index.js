(() => {
  const array = [1,2,3,2,5,6,7,8,9];
  const sum = 8;
  const data = findSum(array, sum);
  console.log('data', data);
})();

function findSum(array, sum) {
  const newArr = array.map(item => sum - item);

  const set = {};
  array.map(item => {
    if (set[item]) {
      set[item]++;
    } else {
      set[item] = 1;
    }
  });
  let count = 0;

  while(newArr.length > 0) {
    const data = newArr.pop();

    if (set[data] && set[data] > 0) {
      count ++;
      set[data]--;
      console.log(data, sum - data);
    }
  }
  return count;
}
