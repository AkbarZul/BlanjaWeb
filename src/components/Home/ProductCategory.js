import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Jas } from "../../assets/style";
import Rating from "../Rating/Rating";
import axios from "axios";
const getUrl = "http://localhost:8000/search";

class ProductCategory extends Component {
  state = {
    products: [],
  };

  getAllProducts = () => {
    const categorySort = this.props.ctg;
    axios
      .get(getUrl + categorySort)
      .then(({ data }) => {
        this.setState({
          products: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getAllProducts();
  };
  render() {
    const { products } = this.state;
    console.log(this.state.products);

    return (
      <>
        <div className="container">
          <div className="row d-flex flex-row justify-content-center">
            {products.map(
              ({
                id,
                product_name,
                product_price,
                product_brand,
                product_rating,
              }) => {
                return (
                  <Card
                    className="card-style"
                    style={{ width: "18rem" }}
                    key={id}
                  >
                    <Link
                      to={{
                        pathname: `/product/${id}`,
                        state: this.state,
                      }}
                    >
                      <img src={Jas} className="card-img-top" alt="..." />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{product_name}</h5>
                      <p className="card-text">{product_price}</p>
                      <p className="card-text2">{product_brand}</p>
                      <Rating product_rating={product_rating} />
                    </div>
                  </Card>
                );
              }
            )}
          </div>
        </div>
      </>
    );
  }
}

export default ProductCategory;
