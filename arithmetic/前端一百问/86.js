const array = [2, 7, 11, 15];

const target = 13;

function getIndex(array, target) {
  const obj = {

  };
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (item <= target) {
      if (obj[item] !==  undefined) {
        return [obj[item], index];
      } else {
        obj[target - item] = index;
      }
    }
  }
  return false;
}

console.log(getIndex(array, target));
