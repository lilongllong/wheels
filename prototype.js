
function A(name)
{
    this.name = name;
}

A.prototype.clone = function()
{
    return Object.create(A);
}

function B(name)
{
    A.apply(this, [name]);
    console.log("b create");
}

const a = new A("Aclass");
B.prototype = a.clone();
a.name = "ss";

const b = new B("Bclass");
b.name = "dsf";
console.log(B);
console.log(b.name);
