import React, { useState, useEffect } from "react";
import { Card, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Jas } from "../../assets/style";
import Rating from "../Rating/Rating";
import axios from "axios";
import Sidebar from "../SidebarProfile/Sidebar";
import Navbar from "../Navbar";
const getUrl = process.env.REACT_APP_URL;

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.auth.data.token);
  const getProducts = () => {
    axios
      .get(`${getUrl}/products/user?keyword=created_at DESC`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        const products = res.data.data;
        console.log("products", products);
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="container-selling" style={{ height: "100%" }}>
          <Jumbotron className="container-content" style={{ height: "100%" }}>
            <h3>Your Product</h3>
            <hr></hr>
            {products.length === 0 ? (
              <p>Your product empty</p>
            ) : (
              <div className="container">
                <div className="row d-flex flex-row justify-content-arround">
                  {products.map(
                    ({
                      id,
                      product_name,
                      product_photo,
                      category_name,
                      product_price,
                      product_qty,
                      product_desc,
                      rating,
                    }) => {
                      return (
                        <Card
                          className="card-style"
                          style={{ width: "18rem", marginRight: "12px" }}
                          key={id}
                        >
                          <Link
                            to={{
                              pathname: `/products/${id}`,
                              products,
                            }}
                          >
                            <img
                              src={JSON.parse(product_photo).shift()}
                              className="card-img-top"
                              alt="..."
                              style={{ height: "15rem" }}
                            />
                          </Link>
                          <div className="card-body">
                            <h5 className="card-title">{product_name}</h5>
                            <p className="card-text">Rp. {product_price}</p>
                            <p className="card-text2">{category_name}</p>
                            <Rating product_rating={rating} />
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "row", marginBottom: '20px', marginTop: '20px', justifyContent: 'space-around' }}
                          >
                            <button className="editProd">
                              <div className="btn-login-nav ">Edit</div>
                            </button>
                            <button className="deleteProd">
                              <div className="btn-login-nav ">Delete</div>
                            </button>
                          </div>
                        </Card>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </Jumbotron>
        </div>
      </div>
    </>
  );
};

export default GetProduct;
