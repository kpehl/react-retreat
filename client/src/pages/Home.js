import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import CustomSlider from "../components/MainSlider"
// import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CustomSlider/>
      <CategoryMenu />
      <ProductList />
      {/* <Cart /> */}
      
    </div>
  );
};

export default Home;
