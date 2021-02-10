import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  addToCheckout,
  clearCart,
  clearCheckout,
} from "../redux/actions/product";
import { useSelector, useDispatch } from "react-redux";
import "../assets/style/mybag.css";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { API } from "../utility/Auth";

const Mybag2 = () => {
  const [cart, setCart] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    getAddressUser();
  }, []);

  const handleSelectAll = (evt) => {
    if (evt.target.checked) {
      stateCarts.map((item) => (item.selected = true));
      setCart([...cart]);
    } else {
      stateCarts.map((item) => (item.selected = false));
      setCart([...cart]);
    }
  };

  const handleSelectItem = (evt) => {
    if (evt.target.checked) {
      let penampung = stateCarts.filter(
        (item) => item.id === Number(evt.target.id)
      );
      penampung[0].selected = true;
      setCart([...cart]);
    } else {
      let penampung = stateCarts.filter(
        (item) => item.id === Number(evt.target.id)
      );
      penampung[0].selected = false;
      setCart([...cart]);
    }
  };

  const dispatch = useDispatch();
  const stateCarts = useSelector((state) => state.product.carts);
  console.log("STATECART", stateCarts);
  const token = useSelector((state) => state.auth.data.token);

  const getAddressUser = async () => {
    await axios
      .get(`${API}/address`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        const address = res.data.data;
        setAddress(address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const kirim = () => {
    // console.log(cart.filter(item => item.selected === true));
    // stateCarts.filter(item => item.selected === true)
    let invoice = Math.floor(Math.random() * 100001) + 1;
    let productId = stateCarts
      .filter((item) => item.selected === true)
      .map((item) => {
        return {
          product_id: item.id,
          product_qty: item.qty,
          sub_total_item: item.qty * item.price,
        };
      });
    const sendData = {
      transaction_code: invoice,
      seller_id: stateCarts[0].seller_id,
      id_address: address[0].id_address,
      item: productId,
    };
    dispatch(addToCheckout({ sendData }));
  };

  const handleDeleteCart = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure to delete the bag?")) {
      dispatch(clearCart());
      dispatch(clearCheckout());
    } else {
      return;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 style={{ fontSize: "34px", fontWeight: "700" }}>My Bag</h1>
        {stateCarts.length ? (
          <div className="d-flex ">
            <div className="left">
              <div className="col chart justify-content-between">
                <div className="selectAll">
                  <div className="mt-3">
                    <input
                      type="checkbox"
                      className="cek"
                      onChange={handleSelectAll}
                    />
                  </div>
                  <p className="ml-3 selectitem">
                    {`Select all item (${
                      stateCarts.filter((item) => item.selected === true).length
                    } items selected)`}
                  </p>
                </div>
                <a
                  href="/"
                  style={{ color: "#DB3022", marginTop: "10px" }}
                  onClick={handleDeleteCart}
                >
                  Delete
                </a>
              </div>
              {stateCarts.map((item) => {
                return (
                  <div
                    className="col prodct justify-content-between"
                    key={item.id}
                  >
                    <div className="selectAll">
                      <div className="mt-3">
                        <input
                          type="checkbox"
                          className="cek"
                          name={item.name}
                          onChange={handleSelectItem}
                          id={item.id}
                          checked={item.selected}
                        />
                      </div>
                      <div className="img-chart">
                        <img
                          style={{ height: "70px" }}
                          src={item.photo}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="name-prodct">{item.name}</p>
                        <p className="brand-product text-muted">{item.brand}</p>
                      </div>
                      <div
                        className="d-flex justify-content-between ml-5 mt-3"
                        style={{ height: "36px", width: "150px" }}
                      >
                        {item.qty === 1 ? (
                          <button
                            className="btn-c"
                            style={{ backgroundColor: "#D4D4D4" }}
                          >
                            -
                          </button>
                        ) : (
                          <button
                            className="btn-c"
                            style={{ backgroundColor: "#D4D4D4" }}
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                          >
                            -
                          </button>
                        )}
                        <p>{item.qty}</p>
                        <button
                          className="btn-c"
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: "solid 1px",
                          }}
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="prc">
                      {`Rp. ${(item.price * item.qty).toLocaleString("id-ID")}`}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="right">
              <div className="shop-sumry">
                <p className="smry-title">Shopping summary</p>
                <div className="ttl-price">
                  <p className="text-price text-muted">Total price</p>
                  <p className="pay">
                    Rp.
                    {stateCarts
                      .filter((item) => item.selected === true)
                      .reduce((total, item) => {
                        return total + item.price * item.qty;
                      }, 0)
                      .toLocaleString("id-ID")}
                  </p>
                </div>
                {stateCarts.filter((item) => item.selected === true).length ? (
                  <Link
                    className="text-decoration-none"
                    to={{
                      pathname: "/checkout",
                      data: cart.filter((item) => item.selected === true),
                      address,
                    }}
                  >
                    <button className="btn-buy" onClick={kirim}>
                      <p className="text-buy">Buy</p>
                    </button>
                  </Link>
                ) : (
                  <button
                    className="btn-buy"
                    onClick={() => setShowAlert(true)}
                  >
                    <p className="text-buy">Buy</p>
                  </button>
                )}
              </div>
              {showAlert
                ? (setTimeout(() => {
                    setShowAlert(false);
                  }, 4000),
                  (
                    <Alert
                      // className={classname(
                      //   "mt-5 alert-empty",
                      //   colors.error,
                      //   colors.whiteText
                      // )}
                      variant="dark"
                      onClose={() => setShowAlert(false)}
                      dismissible
                    >
                      <Alert.Heading>Cart is empty!</Alert.Heading>
                      <p>
                        Select at least 1 product to buy, then continue to
                        payment.
                      </p>
                    </Alert>
                  ))
                : ""}
            </div>
          </div>
        ) : (
          <h1
          // className={classname(
          //   text.headline,
          //   colors.grayText,
          //   "text-empty-cart"
          // )}
          >
            (My bag is empty)
          </h1>
        )}
      </div>
    </div>
  );
};

export default Mybag2;
