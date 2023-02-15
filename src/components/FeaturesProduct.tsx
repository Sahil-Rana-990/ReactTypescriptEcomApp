import React, { useEffect } from "react";
import "./componant.css";
import { SelectedProducts } from "./SelectedProduct";
import { getapi } from "../reducers/HomeReducer";
import { useAppDispatch, useAppSelecter } from "../featur";


export default function FeaturesProduct() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getapi()); //call api for featured product
  }, []);

  const { featuredProducts, isLoading } = useAppSelecter((state) => state.home);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="feature-main">
      <h1 className="my-2">Feature Products</h1>
      <SelectedProducts data={featuredProducts} />
    </div>
  );
}
