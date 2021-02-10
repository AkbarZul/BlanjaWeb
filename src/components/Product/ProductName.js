import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import Newdata from "../Home/NewData";
import { StarRate } from "../../assets/style";
import "../../assets/style/product.css";
import Rating from "../Rating/Rating";
import { API } from "../../utility/Auth";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/product";

const ProductName = (props) => {
  const {
    name,
    price,
    brand,
    condition,
    desc,
    size,
    photo,
    qty,
    color,
    rating,
    id,
    seller_id,
  } = props;
  const [jumlah, setJumlah] = useState(1);
  const [sizes, setSizes] = useState(size[0]);
  const [warna, setWarna] = useState("");
  console.log("color", warna);
  console.log("jumlah", jumlah);
  console.log("sizes", sizes);
  console.log("ID", id);
  console.log("ID_SELLER", seller_id);

  useEffect(() => {
    setSizes();
    setWarna();
  }, []);

  const history = useHistory();

  const { carts: stateCarts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const kirim = () => {
    const sendData = {
      brand: brand,
      id: id,
      photo: photo[0],
      name: name,
      price: Number(price),
      qty: jumlah,
      seller_id: seller_id,
      selected: true,
    };
    dispatch(addToCart(sendData));
    history.push("/mybag");
  };

  const index = stateCarts.findIndex((item) => {
    return item.id === id;
  });

  console.log("INDEX", index);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-5">
            <img className="img-fluid rounded" src={photo[0]} alt="" />
            <div className="d-flex">
              <img
                className="img-fluid rounded mt-2"
                src={photo[0]}
                alt="img"
                style={{ width: "20%", margin: "1px" }}
              />
              <img
                className="img-fluid rounded mt-2"
                src={photo[1]}
                alt="img"
                style={{ width: "20%", margin: "1px" }}
              />
              <img
                className="img-fluid rounded mt-2"
                src={photo[2]}
                alt="img"
                style={{ width: "20%", margin: "1px" }}
              />
            </div>
          </div>
          <div className="col-7">
            <h3 className="name">{name}</h3>
            <p className="brand">{brand}</p>
            <Rating product_rating={rating} />
            <h3 className="tag-price mt-5">Price</h3>
            <p className="price">Rp. {price}</p>
            <h3 className="color">Color</h3>
            {color &&
              color.map(({ id, color_hexa, color_name }) => {
                return (
                  <button
                    key={id}
                    onClick={() => setWarna(color_name)}
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor:
                        color_name === warna ? color_hexa : "white",
                      borderColor: color_hexa,
                      borderRadius: "75%",
                      borderWidth: "15px",
                    }}
                    className="mr-3"
                  />
                );
              })}
            {/* <button className="black mr-3"></button>
            <button className="red mr-3"></button>
            <button className="blue mr-3"></button>
            <button className="green "></button> */}
            <div className="d-flex">
              <p className="tag-size mr-5 mt-5">Size</p>
              <p className="tag-total mt-5 ml-5">Jumlah</p>
            </div>

            <div className="d-flex">
              <button
                className="minus mr-2"
                onClick={() => {
                  if (sizes === size[0]) {
                    setSizes(size[1]);
                  } else if (sizes === size[1]) {
                    setSizes(size[2]);
                  } else {
                    setSizes(size[0]);
                  }
                }}
              >
                <p>-</p>
              </button>
              <p className="number mt-2">{sizes}</p>
              <button
                className="plus ml-2"
                onClick={() => {
                  if (sizes === size[0]) {
                    setSizes(size[1]);
                  } else if (sizes === size[1]) {
                    setSizes(size[2]);
                  } else {
                    setSizes(size[0]);
                  }
                }}
              >
                <p>+</p>
              </button>
              <button
                className="minus2 mr-2"
                style={{
                  backgroundColor: jumlah === 1 ? "#d4d4d4" : "white",
                  borderColor: jumlah === 1 ? "white" : "gray",
                }}
                onClick={() => {
                  if (jumlah === 1) {
                    return;
                  } else {
                    setJumlah(jumlah - qty);
                  }
                }}
              >
                <p style={{ color: jumlah === 1 ? "white" : "black" }}>-</p>
              </button>
              <p className="number mt-2">{jumlah}</p>
              <button
                className="plus ml-2"
                onClick={() => {
                  setJumlah(jumlah + qty);
                }}
              >
                <p>+</p>
              </button>
            </div>
            <div className="d-flex">
              <button className="chat mt-3 rounded-pill">Chat</button>
              {index >= 0 ? (
                <button
                  className="ml-2 mt-3 rounded-pill"
                  style={{ backgroundColor: "#222222", color: "white" }}
                >
                  item already in bag
                </button>
              ) : (
                <button
                  className="mybag ml-2 mt-3 rounded-pill"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        brand: brand,
                        id: id,
                        photo: photo[0],
                        name: name,
                        price: Number(price),
                        qty: jumlah,
                        seller_id: seller_id,
                        selected: false,
                      })
                    );
                  }}
                >
                  Add bag
                </button>
              )}
              {/* <Link to={{
                    pathname:"/checkout",
                    state: this.state,
                    }}> */}
              <button className="buy ml-2 mt-3 rounded-pill" onClick={kirim}>
                Buy Now
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
        <h3 className="informasi">Informasi Produk</h3>
        <h3 className="tag-condition mt-5">Condition</h3>
        <p className="condition">{condition}</p>
        <h3 className="tag-desc">Description</h3>
        <p className="desc">{desc}</p>
        <p className="informasi">Product review</p>
        <div className="d-flex">
          <p className="rate">5.0</p>
          <p className="five">/5</p>
        </div>
        <div className="star">
          <i className="fas fa-star text-warning"></i>
          <i className="fas fa-star text-warning"></i>
          <i className="fas fa-star text-warning"></i>
          <i className="fas fa-star text-warning"></i>
          <i className="fas fa-star text-warning"></i>
        </div>
        <section>
          <hr />
          <h2 className="part-section mt-5">You can also like this</h2>
          <p>You’ve never seen it before!</p>
        </section>

        <article>
          <div className="row d-flex flex-row justify-content-center">
            <Newdata />
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProductName;
