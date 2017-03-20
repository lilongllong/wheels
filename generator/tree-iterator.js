//使用generator + yield 实现二叉树遍历
function Tree(left, text, right)
{
    this.left = left;
    this.right = right;
    this.text = text;
}
/*用数组构建结构二叉树*/
function constructTree(array)
{
    if (array)
    {
        if (array.length === 1)
        {
            return new Tree(null, array[0], null);
        }
        else
        {
            return new Tree(constructTree(array[0]), array[1], constructTree(array[2]));
        }

    }
    else
    {
        return null;
    }
}

function *inorder(tree)
{
    if (tree && tree.left)
    {
        yield *inorder(tree.left);
    }
    yield tree.text;
    if (tree && tree.right)
    {
        yield *inorder(tree.right);
    }    
}

let tree = constructTree([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
console.log(tree);
const result = [];
const generator = inorder(tree);
for(let item of generator)
{
    result.push(item);
}

console.log(result);
