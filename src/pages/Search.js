import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { Jas } from "../../assets/style";
import Rating from "../components/Rating/Rating";
import Navbar from "../components/Navbar";
import ImgNotFound from "../assets/image/no-product-found.png";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
// const getUrl = "http://19/search";

const Search = (props) => {
  const [getSearch, setGetSearch] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  //   let { searchKey } = useHistory();
  const { searchKey } = props.location;
  console.log("searchhhh", props.location);

  const searching = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/search?keyword=${searchKey}`)
      .then((res) => {
        const result = res.data.data;
        console.log("tes res", res.data.status);
        setGetSearch(result);
        setIsNotFound(false);
      })
      .catch((err) => {
        setIsNotFound(true);
        console.log("ini catch", err);
      });
  };

  useEffect(() => {
    searching(searchKey);
  }, [searchKey]);

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
            <p>Try another keyword or check product recommendation.</p>
          </div>
        </div>
        ) : (
          <div className="row d-flex flex-row justify-content-center">
            {getSearch &&
              getSearch.map(
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

export default Search;
