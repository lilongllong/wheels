const loopFunc = (item, index) => {
  console.log(item, index)
  if (index === 2) {
    throw new Error('中文');
    return;
  }
}

const arr = [1,2,3,4,5];

console.log(arr.forEach);

// arr.forEach(loopFunc);
