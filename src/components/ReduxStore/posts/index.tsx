import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './PostsSlice';
import {POSTS_STATUS } from '../constrant';

export default () => {
  const { posts, status, error } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === POSTS_STATUS.pending) {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  console.log(posts, status, error);
  return (
    <div>
      <h1>Post</h1>
      <div>{status}</div>
      {(posts || []).map((item: number | string | undefined ) => {
        return <div key={item}>{item}</div>
      })}
    </div>
  )
}
