"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compose() {
    var args = arguments.reduce(function (prev, cur) { return prev.unshift(cur); }, []);
    var result = args.reduce(function (prev, curr) {
        if (prev === null) {
            return curr;
        }
        else {
            if (typeof curr === 'function') {
                return curr(prev);
            }
            throw Error('compose arguments must be functions!');
        }
    }, null);
    return result;
}
exports.default = compose;
//# sourceMappingURL=compose.js.map