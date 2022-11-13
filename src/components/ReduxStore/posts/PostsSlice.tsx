import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../api/client';
import { POSTS_STATUS } from '../constrant';

export const postsSlicer = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: POSTS_STATUS.pending,
    error: null
  },
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = POSTS_STATUS.pending;
      })
      // 接口请求返回
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.status = POSTS_STATUS.fulfilled;
        state.posts = state.posts.concat(payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = POSTS_STATUS.failure;
        state.error = action.error.message;
      })
  }

})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data;
})

export default postsSlicer.reducer;
