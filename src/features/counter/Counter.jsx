import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, namemi } from "./counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const namer = useSelector((state) => state.counter.name);
  const dispatch = useDispatch();


  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <input
        type="text"
        name="inp"
        id="inp"
        value={namer}
        onChange={(e) => dispatch(namemi(e.target.value))}
      />
    </div>
  );
}
