const first = '1213214325342547658363';
const second = '18473727323';

String.prototype.add = function(value) {
	const calucatSum = function (leftArr, rightArr) {
		const enhanceValue = 0;
		const result = '';
		while (leftArr.length > 0 || rightArr.length > 0) {
			const value1 = leftArr.length > 0 ? leftArr.pop() : 0;
			const value2 = rightArr.length > 0 ? rightArr.pop() : 0;
			const sum = Number(value1) + Number(value2) + enhanceValue;
			resut = sum % 10 + result;
			enhanceValue = Math.floor(sum / 10);
		}
		return enhanceValue ? '1' + result : result;
	};
	const substract = function (leftArr, rightArr) {
		const length = Math.max(leftArr.length, rightArr.length) - 1;
		// 此处十进制的补码是 正数0001283729 负数999992999，-123的补码是 9876 234是0234 相加是 1
		const byte = leftArr[0] === '-' ? [] : '';
	};
   	if (typeof value === 'number' || typeof value === 'string') {
    	const chars1 = this.split('');
		const chars2 = String(value).split('');
		if (chars1[0] === '-' && chars2[0] === '-') {
			return '-' + calucatSum(chars1.slice(1), chars2.slice(1));
		} else if (chars1[0] !== '-' && chars2[0] !== '-') {
			return calucatSum(chars1.slice(1), chars2.slice(1));
		} else if (chars1[0] === '-') {
			return substract(chars1, chars2.push('+'));
		} else {
			return substract(chars1.push('+'), chars2);
		}
		
   	}
   	return this;
}

first.add(second);
