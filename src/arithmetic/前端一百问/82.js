const array = [0,1,0,3,12];
let lastIndex = 0;
array.forEach((item, index) => {
  if (item !== 0) {
    array[lastIndex] = array[index];
    lastIndex ++;
  }
});

while(lastIndex < array.length) {
  array[lastIndex] = 0;
  lastIndex ++;
}
console.log(array);