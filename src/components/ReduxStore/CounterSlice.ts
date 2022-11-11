import { createSlice } from '@reduxjs/toolkit';

export const counterSlicer = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    userLoaded: (state, action) => {
      state.value += action.payload;
    }
  }
});

// A thunk is a specific kind of Redux function that can contain asynchronous logic. Thunks are written using two functions:

// An inside thunk function, which gets dispatch and getState as arguments
// The outside creator function, which creates and returns the thunk function
export const incrementAsync = (amount: number) => (dispatch: any) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
}

// 与上面的方法一致，只是写法不同
// 都是 redux - thunk, 返回一个以 dispatch 和 getState 为入参的 thunk 函数
// export const incrementAsync = (amount: number) => {
//   return (dispatch: any) => {
//     setTimeout(() => {
//       dispatch(incrementByAmount(amount));
//     }, 1000);
//   }
// }

// the outside "thunk creator" function
export const fetchUserById = (userId: number | string) => {
  const userAPI = {
    fetchById: (userId: number | string) => {return userId;}
  };
  // the inside "thunk function"
  return async (dispatch: any, getState: any) => {
    try {
      // make an async call in the thunk
      const user = await userAPI.fetchById(userId)
      // dispatch an action when we get the response back
      dispatch(userLoaded(user))
    } catch (err) {
      // If something went wrong, handle it here
    }
  }
}
export const { increment, decrement, incrementByAmount, userLoaded } = counterSlicer.actions;

export default counterSlicer.reducer;


