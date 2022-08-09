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
      <div
        key={recipe.idMeal}
        className="tile col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <p>{recipe.strInstructions}</p>
        <p>{recipe.strArea}</p>
      </div>
    ));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
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
      <div className="container row">{renderRecipes()}</div>
    </div>
  );
}
