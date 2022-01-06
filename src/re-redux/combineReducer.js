export default function combineReducer(reducerMap) {
  return (state, action) => {
    const resultState = object.assign({}, state);
    for(let key in reducerMap) {
      resultState[key] = reducerMap[key](state[key], action);
    }
    return resultState;
  };
}
