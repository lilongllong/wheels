import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, incrementAsync, fetchUserById } from './CounterSlice';

export default function Counter () {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();


  return (
    <div>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>increment by 5</button>
      <button onClick={() => dispatch(incrementAsync(10))}>increment async by 10</button>
      <button onClick={() => dispatch(fetchUserById(100))}>increment by ajax</button>
    </div>
  )
}
