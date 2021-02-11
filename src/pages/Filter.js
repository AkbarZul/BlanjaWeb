import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { Jas } from "../../assets/style";
import Rating from "../components/Rating/Rating";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
// const getUrl = "http://19/search";

const Filter = (props) => {
  const [getFilter, setGetFilter] = useState([]);
  // let { color, size, category }= useParams();
  const {
    color,
    size, 
    category
  } = props.location;
  console.log("getFilter", getFilter);

  console.log("colorfil", color);
  console.log("categoryfil", category);
  console.log("sizefil", size);

  console.log("test props", props);
  const handleFilter = () => {
    axios
    .get(
      `${process.env.REACT_APP_URL}/products/filter?category=${category}&size=${size}&color=${color}`
      )
    .then((res) => {
      const filter = res.data.data;
      console.log("ashduasdh", filter);
      setGetFilter(filter)

    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    handleFilter();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row d-flex flex-row justify-content-center">
          {getFilter && getFilter.map(
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
                  key={id_categories}
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
      </div>
    </>
  );
};

export default Filter;
