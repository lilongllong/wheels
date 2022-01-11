export default function combineReducer(reducerMap) {
    return function (state, action) {
        var resultState = object.assign({}, state);
        for (var key_1 in reducerMap) {
            resultState[key_1] = reducerMap[key_1](state[key_1], action);
        }
        return resultState;
    };
}
//# sourceMappingURL=combineReducer.js.map