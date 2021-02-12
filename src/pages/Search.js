import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { Jas } from "../../assets/style";
import Rating from "../components/Rating/Rating";
import Navbar from "../components/Navbar";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
// const getUrl = "http://19/search";


const Search = (props) => {
  const [getSearch, setGetSearch] = useState([]);
  //   let { searchKey } = useHistory();
  const { searchKey } = props.location;
  console.log("searchhhh", props.location);

  const getEmpty = () => {
    return <p>SOrry, pala kau ngga ada?</p>;
  };
  const searching = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/search?keyword=${searchKey}`)
      .then((res) => {
        // if (res.data.status === 404) {
        //   getEmpty();
        // }
        const result = res.data.data;
        console.log("tes res", res);
        setGetSearch(result);
      })
      .catch((err) => {
        
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
        {getSearch.length === 0 ? (
          <h1>Product Not Found</h1>
        ) : (
          <div className="row d-flex flex-row justify-content-start">
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
                          style={{height: '15rem'}}
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
