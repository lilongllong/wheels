"use strict";
var html = '<div>Directory<ul><div>Apple</div><div>Orange</div></ul></div>';
// Convert html to object.
// 可以采用堆栈更快 采用堆栈的
function splitTag(html) {
    // 自元素才拆分
    var stack = [];
    var index = 0;
    while (index < html.length) {
        if (html[index] === '<' && html[index + 1] !== '/') {
            // 进入入站模式
            var closeTagIndex = html.slice(index + 1).indexOf('>');
            stack.push({ tag: html.slice(index + 1, index + closeTagIndex + 1), children: [] });
            index = index + closeTagIndex + 2;
        }
        else if (html[index] === '<' && html[index + 1] === '/') {
            // 出栈
            var closeTagIndex = html.slice(index + 1).indexOf('>');
            var tag = html.slice(index + 2, index + closeTagIndex + 1);
            var children = [];
            while (stack.length > 0) {
                var popHtml = stack.pop();
                if (typeof popHtml === 'string' || popHtml.tag !== tag) {
                    children.unshift(popHtml);
                }
                else {
                    popHtml.children = children;
                    stack.push(popHtml);
                    break;
                }
            }
            index = index + closeTagIndex + 2;
        }
        else if (html[index] !== '<') {
            // 进入自元素模式
            var lastIndex_1 = html.slice(index).indexOf('<');
            if (lastIndex_1 !== 0) {
                stack.push(html.slice(index, index + lastIndex_1));
            }
            index = index + lastIndex_1;
        }
    }
    return stack[0];
}
console.log(splitTag(html));
//# sourceMappingURL=parseHtml.js.map