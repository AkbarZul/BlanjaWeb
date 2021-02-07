import React, { Component } from "react";
import { TShirt, Shorts, Jacket, Pants, Shoes } from "../../assets/style";
import { Link } from "react-router-dom";
// import '../../assets/style/category.css'

const Category = () => {
  return (
    <div>
      <div className="container">
        <div className="title-category">
          <h3>Category</h3>
          <p className="lead text-muted">What are you currently looking for</p>
          <div className="row row-cols-5 d-flex justify-content-around">
            <div className="col col-md-auto col-12 rounded box brand-category mb-5">
              <Link
                to={{
                  pathname: "/category",
                  search: "name=t-shirt",
                }}
              >
                <img src={TShirt} alt="" className="fluid mx-auto d-block" />
                <h3>T-Shirt</h3>
              </Link>
            </div>

            <div className="col col-md-auto col-12 rounded box brand-category-1 mb-5">
              <Link
                to={{
                  pathname: "/category",
                  search: "name=celana pendek",
                }}
              >
                <img src={Shorts} alt="" className="fluid mx-auto d-block" />
                <h3>Shorts</h3>
              </Link>
            </div>
            <div className="col col-md-auto col-12 rounded box brand-category-2 mb-5">
              <Link
                to={{
                  pathname: "/category",
                  search: "name=jacket",
                }}
              >
                <img src={Jacket} alt="" className="fluid mx-auto d-block" />
                <h3>Jacket</h3>
              </Link>
            </div>

            <div className="col col-md-auto col-12 rounded box brand-category-3 mb-5">
              <Link
                to={{
                  pathname: "/category",
                  search: "name=celana panjang",
                }}
              >
                <img src={Pants} alt="" className="fluid mx-auto d-block" />
                <h3>Pants</h3>
              </Link>
            </div>

            <div className="col col-md-auto col-12 rounded box brand-category-4 mb-5">
              <Link
                to={{
                  pathname: "/category",
                  search: "name=sepatu",
                }}
              >
                <img src={Shoes} alt="" className="fluid mx-auto d-block" />
                <h3>Shoes</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
