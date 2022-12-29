export const extractTags = (arr: any[], tagAttrs: string[]) => {
  const result = new Map();
  if (!Array.isArray(arr) || arr.length === 0) {
    return [['无数据', 1]]
  }
  arr.forEach(item => {
    tagAttrs.forEach(tagAttr => {
      const strs = (item[tagAttr] || '').replace(/，/g, ' ').split(' ').filter((tag: string) => tag?.length);
      strs.forEach((tag: string) => {
        result.set(tag, (result.get(tag) || 0) + 1);
      });
    });
  });
  return Array.from(result.entries());
}
