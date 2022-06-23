function isObject(value) {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
}

function splitPath(value) {
  return [];
}


function baseSet(Object, path, value) {
  if (!isObject(Object)) {
    return Object;
  }
  const paths = splitPath(path);
}
