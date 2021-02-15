import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../assets/image/loader.gif";
import ModalChooseAddress from "../components/Modal/ModalAddress/ModalChooseAddress";
import ModalSelectPayment from "../components/Modal/ModalAddress/ModalSelectPayment";
import ModalAddAddress from "../components/Modal/ModalAddress/ModalAddAddress";
import { Bounce, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, clearCheckout, addToCheckout } from "../redux/actions/product";
import axios from "axios";
import { API } from "../utility/Auth";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/mybag.css";
import "../assets/style/checkout.css";

toast.configure();
const Checkout = (props) => {
  const [showChooseAddress, setShowChooseAddress] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [address, setAddress] = useState([]);
  const [getFirstAddress, setGetFirstAddress] = useState([]);


  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.product.checkout);
  const seller_id = useSelector((state) => state.product.checkout.seller_id);
  const transaction_code = useSelector((state) => state.product.checkout.transaction_code);
  const item = useSelector((state) => state.product.checkout.item);

  const stateCarts = useSelector((state) => state.product.carts);
  const token = useSelector((state) => state.auth.data.token);
  const { getAddress } = props.location;
  // const { changeAddres } = props.location;
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
        const addressNull = res.data.data;
        const addressData = res.data.data[0];

        if (address === null) {
          setAddress(addressNull);
          console.log("dalas28", addressNull);
        } else {
          setAddress(addressData);
          const id_address = res.data.data[0].id_address
          const sendData = {
            transaction_code: transaction_code,
            seller_id: seller_id,
            id_address: id_address,
            item: item,
          };
          dispatch(addToCheckout({sendData}))
          console.log("dalemmm", address);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAddressUser(address);
  }, []);

  console.log("address", address);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1
          style={{ fontSize: "34px", fontWeight: "700", marginBottom: "15px" }}
        >
          Checkout
        </h1>
        {stateCarts.filter((item) => item.selected === true).length ? (
          <div className="row">
            <div className="col-12 col-lg-8">
              <p className="ttl-addrs">Shipping Address</p>
              <div className="col address">
                {address ? (
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
                      className="col prodct d-flex justify-content-between"
                      key={item.id}
                      style={{padding: "10px", marginBottom: "20px"}}
                    >
                      {/* <div className="selectAll" > */}
                        <div className="col-2 img-chart">
                          <img
                            style={{ height: "70px" }}
                            src={item.photo}
                            alt=""
                          />
                        </div>
                        <div className="col-7">
                          <p className="name-prodct">{item.name}</p>
                          <p className="brand-product text-muted">
                            {item.brand}
                          </p>
                        </div>
                        <div className="col-3">
                          <p className="prc">{`Rp. ${(
                            item.price * item.qty
                          ).toLocaleString("id-ID")}`}</p>
                        </div>
                      {/* </div> */}
                    </div>
                  );
                })}
            </div>
            <div className="col-12 col-lg-4" >
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
                <div style={{width: "100%", borderStyle: "solid", border: "2px", marginBottom: "2px", marginTop: "2px"}}></div>
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
