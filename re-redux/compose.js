export default function compose() {
  const args = arguments.reduce((prev, cur) => prev.unshift(cur), []);

  const result = args.reduce((prev, curr) => {
    if (prev === null) {
      return curr;
    } else {
      if (typeof curr === 'function') {
        return curr(prev);
      }
      throw Error('compose arguments must be functions!');
    }
  }, null);
  return result;
}
