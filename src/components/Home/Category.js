import React, { useState, useEffect } from "react";
import { TShirt, Shorts, Jacket, Pants, Shoes } from "../../assets/style";
import { Link } from "react-router-dom";
import axios from "axios";
// import '../../assets/style/category.css'

const Category = () => {
  const [category, setCategory] = useState([]);

  const getAllCategory = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/categories/?keyword=created_at DESC`)
      .then((res) => {
        const categories = res.data.data;
        setCategory(categories);
        console.log("testing cat", categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="title-category">
          <h3>Category</h3>
          <p className="lead text-muted">What are you currently looking for</p>
          <div
            className="row d-flex justify-content-lg-around justify-content-md-start"
            style={{ borderRadius: "10px" }}
          >
            {category.map(
              ({
                id_categories,
                category_name,
                category_photo,
                color_hexa,
              }) => {
                return (
                  <>
                    <div
                      className="col-md-auto rounded box justify-content-center brand-category-2 mb-5"
                      style={{ backgroundColor: color_hexa, margin: "5px" }}
                    >
                      <Link
                        to={{
                          pathname: `/category/${id_categories}`,
                          // search: "keyword=created_at DESC",
                          category,
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src={category_photo}
                          alt=""
                          className="fluid mx-auto d-block"
                        />
                        <h3>{category_name}</h3>
                      </Link>
                    </div>
                  </>
                );
              }
            )}
            {/* <div className="col col-md-auto col-12 rounded box brand-category mb-5">
              <Link
                to={{
                  pathname: "/category/13",
                  search: "keyword=created_at DESC",
                  state: { shoes: shoes },
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
