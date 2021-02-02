import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";


import CustomSlider from "../components/MainSlider";

const Home = () => {
  return (
    <div className="container">
      <CustomSlider/>
      <CategoryMenu />
      <ProductList />
      <Cart />
      
    </div>
  );
};

export default Home;
