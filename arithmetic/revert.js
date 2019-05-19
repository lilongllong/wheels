/**
 * 题目：链表重新排序
 * 有一个链表它的奇数位是升序排列，偶数列是降序排列，最终的将其变成降序排列
 * 例子：5，40，10，35，15，25，20
 * 结果：40，35，30，25，20，15，10，5 
 */

 function Node(value) {
     this.value = value;
     this.next = null;
 }

 Node.prototype.insert = function () {

 }

 function revert(nodeList) {
    let header = nodeList;
    let first = null;
    let last = null;
    let iteatorA = nodeList;
    let iteatorB = (nodeList || { next: null }).next;
    while(iteatorA !== null && iteatorB !== null) {
        if (iteatorA && iteatorB) {
            // 处理翻转逻辑，插入逻辑
            // 翻转
            const temp = iteatorB.next;
            iteatorB.next = iteatorA;
            // 插入
            if (first && second) {
                // 正常处理
                first.next = iteatorB;
                iteatorA.next = second;
                // 处理指针
                first = first.next;
                second = iteatorA; // first.next.next is right
            } else {
                // 初始化过程
                first = iteatorB;
                second = iteatorA;
                second.next = null;
                header = first;
            }
            // 开始下一次迭代
            iteatorA = temp;
            iteatorB = (temp || { next: null }).next;
        } else if (iteatorA) {
            // 单元素处理插入逻辑：结束逻辑A
            // 无需翻转
            // 插入
            if (first && second) {
                // 正常处理
                first.next = iteatorA;
                iteatorA.next = second;
                // 无需处理指针和下一次迭代
            } else {
                // 初始化过程
                header = iteatorA;
            }
        } else {
            // 都为空
            break;
        }
    }
    return header;
 }
function main() {
    let nodeList = new Node(5);
    let curr = nodeList;
    curr.next = new Node(40);
    curr = curr.next;
    curr.next = new Node(10);
    curr = curr.next;
    curr.next = new Node(35);
    curr = curr.next;
    curr.next = new Node(15);
    curr = curr.next;
    curr.next = new Node(30);
    curr = curr.next;
    curr.next = new Node(20);
    curr = curr.next;
    curr.next = new Node(25);
    const result = revert(nodeList);
    let indexNode = result;
    while(indexNode) {
        console.log(indexNode.value + '->');
        indexNode = indexNode.next;
    }
}

main();
