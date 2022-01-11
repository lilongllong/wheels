"use strict";
/**
 * 对一个二叉搜索树进行序列化和反序列化，由于二叉搜索树的特性可知，其相邻的值的大小关系代表其中序遍历的结果
 * 因此只需要生成器其前序或者后续的遍历结果，两次遍历结果就可以得到最终的二叉搜索树，这里选择前序遍历结果，后续不方便处理且不能使用
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function TreeNode(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}
function initial() {
    var root = new TreeNode(12);
    var node1 = new TreeNode(2);
    node1.right = new TreeNode(3);
    var node2 = new TreeNode(9);
    var node3 = new TreeNode(5);
    node3.left = node1;
    node3.right = node2;
    root.left = node3;
    var node4 = new TreeNode(16);
    var node5 = new TreeNode(17);
    var node6 = new TreeNode(15);
    node5.left = node4;
    node6.right = node4;
    var node19 = new TreeNode(19);
    var node18 = new TreeNode(18);
    node18.right = node19;
    node18.left = node6;
    root.right = node18;
    return root;
}
var tree = initial();
// 这里可以采用堆栈的压栈和出栈 实现成本会更小
function firstPriority(tree) {
    if (tree) {
        return __spreadArray(__spreadArray([tree.value], firstPriority(tree.left), true), firstPriority(tree.right), true);
    }
    else {
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
            }
            else {
                tree.right = new TreeNode(value);
            }
        }
        else {
            if (tree.left) {
                insertTree(tree.left, value);
            }
            else {
                tree.left = new TreeNode(value);
            }
        }
    }
}
function deserialize(value) {
    var array = value.split('_').map(function (item) { return parseInt(item); });
    // 序列化
    var index = 1;
    var root = new TreeNode(array[0]);
    while (index < array.length) {
        insertTree(root, array[index]);
        index++;
    }
    return root;
}
var str = serialize(tree);
console.log(str);
var desTree = deserialize(str);
console.log(desTree.right.left.right);
console.log(serialize(desTree));
//# sourceMappingURL=serialize.js.map