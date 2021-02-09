import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Jas } from "../../assets/style";
import Rating from "../Rating/Rating";
import axios from "axios";
const getUrl = process.env.REACT_APP_URL;

const PopularData = () => {
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    axios
      .get(`${getUrl}/products?limit=80&keyword=created_at DESC`)
      .then((res) => {
        const newProduct = res.data.data.products;
        console.log("products", newProduct);
        setProducts(newProduct);
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
            <Card className="card-style" style={{ width: "18rem" }} key={id}>
              <Link
                to={{
                  pathname: `/products/${id}`,
                  state: products,
                }}
              >
                <img
                  src={JSON.parse(product_photo).shift()}
                  className="card-img-top"
                  alt="..."
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product_name}</h5>
                <p className="card-text">Rp. {product_price}</p>
                <p className="card-text2">{category_name}</p>
                <Rating product_rating={rating} />
              </div>
            </Card>
          );
        }
      )}
    </>
  );
};

export default PopularData;
