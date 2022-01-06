立即执行函数，会存在变量提升，但是提升到相邻作用域，就是提升到立即执行函数附近
Var key = ’number'
(function() {
	var key = ‘quer’;
	if (typeof key === undefined) {
		console.log(‘hello’ + key);
	} else {
		console.log(‘goodby’ + key);
	}
})()

301 暂时性迁移， 302永久性迁移，304从缓存读取
E-tag， expire, cache-controll

Set 集合

.call(可以传入数组)