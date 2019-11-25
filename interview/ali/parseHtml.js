const html = '<div>Directory<ul><div>Apple</div><div>Orange</div></ul></div>';
// Convert html to object.
// 可以采用堆栈更快 采用堆栈的
function splitTag(html) {
  // 自元素才拆分
  const stack = [];
  let index = 0;
  while(index < html.length) {
    if (html[index] === '<' && html[index+1] !== '/') {
      // 进入入站模式
      let closeTagIndex = html.slice(index + 1).indexOf('>');
      stack.push({ tag: html.slice(index + 1, index + closeTagIndex + 1), children: [] });
      index = index + closeTagIndex + 2;
    } else if (html[index] === '<' && html[index + 1] === '/') {
     // 出栈
      let closeTagIndex = html.slice(index + 1).indexOf('>');
      const tag = html.slice(index + 2, index + closeTagIndex + 1);
      let children = [];
      while (stack.length > 0) {
        const popHtml = stack.pop();
       if (typeof popHtml === 'string' || popHtml.tag !== tag) {
         children.unshift(popHtml);
        } else {
          popHtml.children = children;
          stack.push(popHtml);
          break;
        }
      }
      index = index + closeTagIndex + 2;
    } else if (html[index] !== '<') {
     // 进入自元素模式
      const lastIndex = html.slice(index).indexOf('<');
      if (lastIndex !== 0) {
        stack.push(html.slice(index, index + lastIndex));
      }
      index = index + lastIndex ;
    }
  }
  return stack[0];
}

console.log(splitTag(html));
