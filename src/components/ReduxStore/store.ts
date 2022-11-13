import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CounterReducer from './counter/CounterSlice';
import PostsReducer from './posts/PostsSlice';

const reducers = combineReducers({
  counter: CounterReducer,
  posts: PostsReducer
})
export default configureStore({
  reducer: reducers
});
