function* sleep(time) {
  yield new Promise((resolve, reject) => {
    setTimeout(() => { resolve(); }, time);
  });
}
console.log(sleep(1000).next().value.then(() => { console.log('ssss') }));
