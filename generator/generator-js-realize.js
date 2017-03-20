/*
使用js实现generator,实现预期编译效果，不实现itearor迭代器效果
*/

/*
es6输入

const generator = () => {
    const x = yield 1;
    const y = yield x + 1;
    console.log(y, "输出Y");
    return x + y;
};

*/

function generator()
{

    this._state = 0;
    this._finalState = 3;
}

generator.prototype.next = function(lastValue)
{
    if (this._state === this._finalState)
    {
        var value;
        return { value: value, done: true};
    }
    switch(this._state)
    {
        case 0:
            this._state++;
            return { value: 1, done: false };
        case 1:
            this._state++;
            var x = lastValue;
            return { value: x + 1, done: false };
        case 2:
            this._state++;
            var y = lastValue;
            console.log(y, "输出Y");
            return { value: x + y, done: true };
    }
}

var yield = new generator();
console.log(yield.next());
console.log(yield.next(1));
console.log(yield.next(2));
console.log(yield.next());
