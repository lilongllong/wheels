/**
 * 对一个二叉搜索树进行序列化和反序列化，由于二叉搜索树的特性可知，其相邻的值的大小关系代表其中序遍历的结果
 * 因此只需要生成器其前序或者后续的遍历结果，两次遍历结果就可以得到最终的二叉搜索树，这里选择前序遍历结果，后续不方便处理且不能使用
 */

function TreeNode (value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

function initial() {
    const root = new TreeNode(12);
    const node1 = new TreeNode(2);
    node1.right = new TreeNode(3);
    const node2 = new TreeNode(9);
    const node3 = new TreeNode(5)
    node3.left = node1;
    node3.right = node2;
    root.left = node3;
    const node4 = new TreeNode(16);
    const node5 = new TreeNode(17);
    const node6 = new TreeNode(15)
    node5.left = node4;
    node6.right = node4;
    const node19 = new TreeNode(19);
    const node18 = new TreeNode(18);
    node18.right = node19;
    node18.left = node6;
    root.right = node18;
    return root;
}

const tree = initial();
// 这里可以采用堆栈的压栈和出栈 实现成本会更小
function firstPriority(tree) {
    if (tree) {
        return [ tree.value, ...firstPriority(tree.left), ...firstPriority(tree.right)];
    } else {
        return [];
    }
}

function serialize(tree) {
    return firstPriority(tree).join('_');
}

function insertTree(tree, value) {
    if (tree) {
        if (tree.value < value) {
            if (tree.right) {
                insertTree(tree.right, value);
            } else {
                tree.right = new TreeNode(value);
            }
        } else {
            if (tree.left) {
                insertTree(tree.left, value);
            } else {
                tree.left = new TreeNode(value);
            }
        }
    }
}

function deserialize(value) {
    const array = value.split('_').map(item => parseInt(item));
    // 序列化
    let index = 1;
    let root = new TreeNode(array[0]);
    while(index < array.length) {
        insertTree(root, array[index]);
        index ++;
    }
    return root;
}
const str = serialize(tree);
console.log(str);
const desTree = deserialize(str);
console.log(desTree.right.left.right);
console.log(serialize(desTree));