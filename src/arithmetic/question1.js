var readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', function(line) {
	var tokens = parseInt(line);
	console.log(Total(tokens) % BigInt(1000000007));
})

function Total(t) {
  const n = t / 2;
	if(n <= 1) {
    return 1;
  }	
 
	const h = new Array(n+1); 
	h[0] = h[1] = BigInt(1);        //h(0)和h(1)
	for(let i = 2; i <= n; i++) {
		h[i] = BigInt(0);
		for(let j = 0; j < i; j++) //根据递归式计算 h(i)= h(0)*h(i-1)+h(1)*h(i-2) + ... + h(i-1)h(0)
			h[i] += h[j] * h[i-1-j];
	}
	let result = h[n]; //保存结果
	delete h;       //注意释放空间
	return result;
}