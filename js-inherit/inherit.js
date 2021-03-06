function Animal(type, nickname) {
    this.type = type;
    this.nickname = nickname;
}

Animal.prototype.bar = function () {
    console.log('hello', this.type);
};

function Cat(type, nickname) {
    Animal.apply(this, [type, nickname])
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
var cat = new Cat('cat', 'mimi');
cat.bar();
console.log(cat.constructor.name)
