String.prototype.repeat = function(value) {
    let result = '';
    const tempate = ''.concat(this);
    for (let i = 0; i < value; i++) {
        result = result.concat(tempate)
    }
    return result;
}

console.log('sdd'.repeat(4));
