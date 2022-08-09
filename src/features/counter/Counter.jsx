import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct, productSelector } from "../data/productSlice";
import { decrement, increment, namemi } from "./counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const namer = useSelector((state) => state.counter.name);
  const dispatch = useDispatch();
  const { datas, loading, hasErrors } = useSelector(productSelector);

  console.log(useSelector(productSelector));

  useEffect(() => {
    dispatch(fetchProduct());
    console.log(datas);
  }, [dispatch]);

  const renderRecipes = () => {
    if (loading) return <p>Loading recipes...</p>;
    if (hasErrors) return <p>Cannot display recipes...</p>;

    return datas?.meals?.map((recipe) => (
      <div key={recipe.idMeal} className="tile">
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt="" />
      </div>
    ));
  };

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
      {renderRecipes()}
    </div>
  );
}
