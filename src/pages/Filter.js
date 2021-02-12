import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ImgNotFound from "../assets/image/no-product-found.png";
import axios from "axios";
// const getUrl = "http://19/search";

const Filter = (props) => {
  const [getFilter, setGetFilter] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  // let { color, size, category }= useParams();
  const { color, size, category } = props.location;
  console.log("getFilter", getFilter);

  console.log("colorfil", color);
  console.log("categoryfil", category);
  console.log("sizefil", size);

  const handleFilter = () => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/products/filter?category=${category}&size=${size}&color=${color}`
      )
      .then((res) => {
        // const failed = res.data.status;
        // if (failed === 404) {
        //   setIsNotFound(true);
        // }
        const filter = res.data.data;
        console.log("ashduasdh", filter.length);
        if (filter.length == 0) {
          setIsNotFound(true);
        } else {
          setGetFilter(filter);
          setIsNotFound(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (getFilter.length === 0) {
  //   setIsNotFound(true)
  // }

  useEffect(() => {
    handleFilter(color, category, size);
  }, [color, category, size]);

  return (
    <>
      <Navbar />
      <div className="container">
        {isNotFound === true ? (
          <div
            className="d-flex justify-content-center align-items-center mt-10"
            style={{ width: "100%", height: "100%" }}
          >
            <div>
              <img src={ImgNotFound} style={{height: "15rem"}} />
            </div>
            <div>
              <h1>Oops, your product not found!</h1>
              <p>Try another filter or check product recommendation.</p>
            </div>
          </div>
        ) : (
          <div className="row d-flex flex-row justify-content-center">
            {getFilter &&
              getFilter.map(
                ({
                  id,
                  id_categories,
                  product_name,
                  product_photo,
                  category_name,
                  product_price,
                  rating,
                }) => {
                  return (
                    <Card
                      className="card-style"
                      style={{ width: "18rem" }}
                      key={id}
                    >
                      <Link
                        to={{
                          pathname: `/products/${id}`,
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
                        <p className="card-text">{product_price}</p>
                        <p className="card-text2">{category_name}</p>
                        {/* <Rating product_rating={rating} /> */}
                      </div>
                    </Card>
                  );
                }
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
