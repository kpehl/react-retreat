import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import CustomSlider from "../components/MainSlider"
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
// import Cart from "../components/Cart";

const Home = () => {
  const { data } = useQuery(QUERY_USER);
  let user;
  let name;
  let admin;
  if (data) {
    user = data.user;
    name = user.firstName +' '+  user.lastName
    admin = data.user.admin;
  }
  if (Auth.loggedIn() && user === null) {
    Auth.logout()
  };
  return (
    <div className="container">
      <h2>Welcome {name} to the React Retreat Resort!</h2>
      <CustomSlider/>
      <CategoryMenu />
      <ProductList />
      {/* <Cart /> */}
      
    </div>
  );
};

export default Home;
