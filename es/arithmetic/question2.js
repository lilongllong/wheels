"use strict";
function parseMolecule(formula) {
    var group, tokens, tokenExp = /([{(\[]|[})\]]|[A-Z][a-z]?)(\d*)/g, stack = [[]];
    while (tokens = tokenExp.exec(formula)) {
        tokens[2] = tokens[2] || 1;
        if (/^[A-Z]/.test(tokens[1])) {
            while (tokens[2]--)
                stack.push(stack.pop().concat([tokens[1]]));
        }
        else if (/[{\(\[]/.test(tokens[1])) {
            stack.push([]);
        }
        else {
            group = stack.pop();
            while (tokens[2]--)
                stack.push(stack.pop().concat(group));
        }
    }
    var result = stack[0].reduce(function (count, x) {
        count[x] = (count[x] || 0) + 1;
        return count;
    }, {});
    var resultStr = [];
    for (var key_1 in result) {
        resultStr.push("".concat(key_1).concat(result[key_1]));
    }
    return resultStr.sort().join('');
}
console.log(parseMolecule('K4[(C2H4OH)3OH]'));
console.log(parseMolecule('NHCO3'));
//# sourceMappingURL=question2.js.map