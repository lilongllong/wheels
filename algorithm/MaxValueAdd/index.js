function add(a, b) {
  if (a !== "" && b !== "") {
    const aArr = a.split("");
    const bArr = b.split("");
    const result = [];

    let length =  Math.max(aArr.length, bArr.length);
    let nextAdd = 0;

    while(length > 0) {
      let aItem = 0;
      let bItem = 0;
      if (aArr.length > 0) {
        aItem = aArr.pop();
      }
      if (bArr.length > 0) {
        bItem = bArr.pop();
      }

      const item = (parseInt(aItem) + parseInt(bItem) + nextAdd) % 10;
      nextAdd = parseInt(((parseInt(aItem) + parseInt(bItem) + nextAdd) - item ) / 10);
      result.push(item);
      length --;
    }

    if (nextAdd > 0) {
      result.push(nextAdd);
    }

    const data = [];
    // 字符串反转
    while( result.length > 0) {
      data.push(result.pop());
    }
    return data.reduce((prev, curr) => prev.concat(curr), "");
  }
}

function getInteger(value) {
  if (value && value !== "") {
    const result = parseInt(value);
    return isNaN(result) ? false : result;
  }
  return false;
}

function handleAddAction() {
  const a = document.getElementById('a-input').value;
  const b = document.getElementById('b-input').value;
  if (getInteger(a) !== false && getInteger(b) !== false) {
    if ( a < 0 || b < 0 ) {
      alert('a or b not be a negative number!');
    } else {
      // add a, b
      const result = add(a, b);
      const resultStr = 'a(' + a + ') + b(' + b + ') = ' + result;
      alert(resultStr)
    }
  } else {
    alert('a or b is not a interger');
  }
}

(() => {
  document.getElementById('submit').addEventListener('click', handleAddAction);
})();
