import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct, productSelector } from "../data/productSlice";
import { decrement, increment, namemi } from "./counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const namer = useSelector((state) => state.counter.name);
  const dispatch = useDispatch();
  const da = useSelector((state) => state);
  console.log(da.product);
  const { datas, loading, hasErrors } = useSelector(productSelector);
  const [searching, setSearching] = useState("");

  console.log(useSelector(productSelector));

  useEffect(() => {
    dispatch(fetchProduct(searching));
    console.log(datas);
  }, [dispatch, searching]);

  const renderRecipes = () => {
    if (loading) return <p>Loading recipes...</p>;
    if (hasErrors) return <p>Cannot display recipes...</p>;

    return datas?.map((recipe) => (
      <div
        key={recipe.idMeal}
        className="tile col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <p>{recipe.strArea}</p>
      </div>
    ));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <input
        type="text"
        placeholder="search"
        className="form-control w-75 my-5"
        value={searching}
        onChange={(e) => setSearching(e.target.value)}
      />
      <div className="container row">{renderRecipes()}</div>
    </div>
  );
}
