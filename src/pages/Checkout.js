import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Jas } from "../assets/style/index";

import "../assets/style/mybag.css";
import "../assets/style/checkout.css";

class Checkout extends Component {
  render() {
    const { name, price, brand } = this.props;
    console.log(name, price, brand);
    return (
      <div>
        <Navbar />

        <div className="container">
          <h1 style={{ fontSize: "34px", fontWeight: "700" }}>Checkout</h1>
          <p className="mt-3 ttl-addrs">Shipping Address</p>
          <div className="d-flex ">
            <div className="left">
              <div className="col address">
                <p>Andreas Jane</p>
                <p>
                  Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja,
                  Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c
                  16] Sokaraja, Kab. Banyumas, 53181
                </p>
                <Link className="text-decoration-none">
                  <div className="btn-choose-address">
                    <p className="addres-btn">Choose another address</p>
                  </div>
                </Link>
              </div>
              <div className="col prodct justify-content-between">
                <div className="selectAll">
                  <div className="mt-3">
                    <input type="checkbox" className="cek" />
                  </div>
                  <div className="img-chart">
                    <img style={{ height: "70px" }} src={Jas} alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="name-prodct">Men's Black and White</p>
                    <p className="brand-product text-muted">Zalora Cloth</p>
                  </div>
                </div>
                <p className="prc">$ 40.00</p>
              </div>
            </div>
            <div className="right">
              <div className="shop-sumry">
                <p className="smry-title">Shopping summary</p>
                <div className="ttl-price">
                  <p className="text-price text-muted">Total price</p>
                  <p className="pay">Rp.$ 200.00</p>
                </div>
                <Link className="text-decoration-none">
                  <div className="btn-buy">
                    <p className="text-buy">Select payment</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
