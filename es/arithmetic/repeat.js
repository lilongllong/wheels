"use strict";
String.prototype.repeat = function (value) {
    var result = '';
    var tempate = ''.concat(this);
    for (var i_1 = 0; i_1 < value; i_1++) {
        result = result.concat(tempate);
    }
    return result;
};
console.log('sdd'.repeat(4));
//# sourceMappingURL=repeat.js.map