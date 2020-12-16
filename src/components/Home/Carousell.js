import React, { Component } from "react";
import { Image1, Image2, Image3, Image4 } from "../../assets/style";
// import Carousel from 'react-bootstrap/Carousel'
// import Carousel from 'react-bootstrap/Carousel'
import "../../assets/style/home.css";

class Carousell extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="tags">
            <div className="list">
              <div className="item-tags">
                <img src={Image1} alt="tags" />
                <p className="item-text">Black edition</p>
              </div>
              <div className="item-tags">
                <img src={Image2} alt="tags" />
                <p className="item-text">Trends in 2020</p>
              </div>
              <div className="item-tags">
                <img src={Image3} alt="tags" />
                <p className="item-text">Black edition</p>
              </div>
              <div className="item-tags">
                <img src={Image4} alt="tags" />
                <p className="item-text">Trends in 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousell;
