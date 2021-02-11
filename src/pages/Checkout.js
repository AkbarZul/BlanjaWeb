import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../assets/image/loader.gif";
import ModalChooseAddress from "../components/Modal/ModalAddress/ModalChooseAddress";
import ModalSelectPayment from "../components/Modal/ModalAddress/ModalSelectPayment";
import ModalAddAddress from "../components/Modal/ModalAddress/ModalAddAddress";
import { Bounce, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, clearCheckout } from "../redux/actions/product";
import axios from "axios";
import { API } from "../utility/Auth";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/mybag.css";
import "../assets/style/checkout.css";

toast.configure();
const Checkout = () => {
  const [showChooseAddress, setShowChooseAddress] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [address, setAddress] = useState([]);

  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.product.checkout);
  const stateCarts = useSelector((state) => state.product.carts);
  const token = useSelector((state) => state.auth.data.token);
  console.log("CHECKOUT", checkout);

  const transaction = () => {
    axios
      .post(`${API}/orders`, checkout, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("success", res);
      })
      .catch((err) => {
        console.log("ERROR", err.response);
      });
    dispatch(clearCart());
    dispatch(clearCheckout());
    toast.success("Yeah! kamu berhasil belanja", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
    });
    setShowPayment(false);
  };

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

  useEffect(() => {
    getAddressUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 style={{ fontSize: "34px", fontWeight: "700" }}>Checkout</h1>
        <p className="mt-3 ttl-addrs">Shipping Address</p>
        {stateCarts.filter((item) => item.selected === true).length ? (
          <div className="d-flex ">
            <div className="left">
              <div className="col address">
                {address.length ? (
                  <>
                    <p>{address.fullname}</p>
                    <p>
                      {`${address.address}, Kota ${address.city}, Provinsi ${address.region}, Kodepos: ${address.zip_code}, ${address.country}`}
                    </p>
                  </>
                ) : null}
                <button
                  className="btn-choose-address"
                  onClick={() => setShowChooseAddress(true)}
                >
                  <p className="addres-btn">Choose another address</p>
                </button>
              </div>
              {stateCarts
                .filter((item) => item.selected === true)
                .map((item) => {
                  return (
                    <div
                      className="col prodct justify-content-between"
                      key={item.id}
                    >
                      <div className="selectAll">
                        <div className="img-chart">
                          <img
                            style={{ height: "70px" }}
                            src={item.photo}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="name-prodct">{item.name}</p>
                          <p className="brand-product text-muted">
                            {item.brand}
                          </p>
                        </div>
                      </div>
                      <p className="prc">{`Rp. ${(
                        item.price * item.qty
                      ).toLocaleString("id-ID")}`}</p>
                    </div>
                  );
                })}
            </div>
            <div className="right">
              <div className="shop-sumry">
                <p className="smry-title">Shopping summary</p>
                <div className="ttl-price">
                  <p className="text-price text-muted">Total price</p>
                  <p className="pay">{`Rp${stateCarts
                    .filter((item) => item.selected === true)
                    .reduce((total, item) => {
                      return total + item.price * item.qty;
                    }, 0)
                    .toLocaleString("id-ID")}`}</p>
                </div>
                <div className="text-decoration-none">
                  <button
                    className="btn-buy"
                    onClick={() => setShowPayment(true)}
                  >
                    <p className="text-buy">Select payment</p>
                  </button>
                </div>
              </div>
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
            (Checkout item is empty)
          </h1>
        )}
      </div>
      <ModalChooseAddress
        show={showChooseAddress}
        onHide={() => setShowChooseAddress(false)}
        showAddAddress={() => setShowAddAddress(true)}
      />
      <ModalSelectPayment
        show={showPayment}
        onHide={() => setShowPayment(false)}
        showAddAddress={() => setShowAddAddress(true)}
        cart={stateCarts.filter((item) => item.selected === true)}
        onSubmit={() => transaction()}
        // handleSelectPayment={(evt) => handleSelectPayment(evt)}
      />
      <ModalAddAddress
        show={showAddAddress}
        onHide={() => setShowAddAddress(false)}
      />
    </div>
  );
};

export default Checkout;
