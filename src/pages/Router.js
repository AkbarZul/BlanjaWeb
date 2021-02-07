import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Mybag from "./Mybag";
import Checkout from "./Checkout";
import SortCategory from "./SortCategory";
import PostProduct from "./PostProduct";
import Update from "./Update";
import MyProfile from "./MyProfile";

// Login Page
// import Login from "../components/Login/Login";
// import Register from "../components/Login/Register";
// import KonfirmasiPassword from "../components/Login/KonfirmasiPassword";
import ResetPassword from "../components/Login/ResetPassword";
import Auth from "./Auth";

export default function Router() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/product/:id" component={Product} />
      <Route path="/mybag" component={Mybag} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/category" component={SortCategory} />
      <Route path="/search" component={SortCategory} />
      <Route path="/inputProduct" component={PostProduct} />
      <Route path="/login" component={Auth} />
      {/* <Route path="/register" component={Auth} />
      <Route path="/konfirmasi" component={Auth} /> */}
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/update" component={Update} />
      <Route path="/my-profile" component={MyProfile} />
    </BrowserRouter>
  );
}
