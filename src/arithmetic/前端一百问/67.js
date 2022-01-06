const array = [2, 10, 3, 4, 5, 11, 10, 11, 20];

const set = new Set(array);
const obj = {};
set.forEach((item) => {
  const key = Math.floor(item / 10);
  if (obj[key]) {
    sort(obj[key], item);
  } else {
    obj[key] = [item];
  }
});

const result = Object.keys(obj).reduce((prev, curr) => { prev.push(obj[curr]); return prev; }, []);

console.log(result);
function sort(array, value) {
  for (let index = 0; index < array.length; index++) {
    if (array[index] >= value) {
      array.splice(index, 0, value);
      break;
    }
  }
  array.push(value);
}