import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../SidebarProfile/Sidebar";
import Navbar from "../Navbar";
import axios from "axios";
import NotFound from "../../assets/image/ordernot.png";
const getUrl = process.env.REACT_APP_URL;

const GetOrder = () => {
  const [order, setOrder] = useState([]);
  const token = useSelector((state) => state.auth.data.token);
  const getOrder = () => {
    axios
      .get(`${getUrl}/orders`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then(({ data }) => {
        const order = data.data;
        console.log("ini order", order);
        setOrder(order);
      })
      .catch((err) => {
        console.log("ini error", err.response);
      });
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="container-selling" style={{ height: "100%" }}>
          <Jumbotron className="container-content" style={{ height: "100%", backgroundColor: "#FFFFFF" }}>
            <h3>My Order</h3>
            <hr></hr>
            {order.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center mt-10">
              <img src={NotFound} style={{height: "15rem"}} />
            </div>
            ) : (
                <div className='container'>
              <div className="row">
                <p className="subTitle" style={{marginRight: '40px', marginLeft: '15px'}}>Order</p>
                <p style={{marginRight: '70px'}}>Sent</p>
                <p style={{marginRight: '90px'}}>Address</p>
                <p className="subTitle" style={{marginRight: '100px'}}>Total</p>
                <p className="subTitle" style={{marginRight: '20px'}}>All Item</p>
              </div>
              {order.map(
                  ({
                    id,
                    transaction_code,
                    total,
                    status_order,
                    address,
                    order_detail,
                  }) => {
                      return(
                          <>
                          <div className='row'>
                              <div className='col-md-1' >{transaction_code}</div>
                              <div className='col-md-2 '>{status_order}</div>
                              <div className='col-md-2 '>{address}</div>
                              <div className='col-md-2 '>Rp. {total}</div>
                          
                          {order_detail.map(
                              ({
                                  category_name,
                                  product_name,
                              }) => {
                                  return(
                                    <div className='col-md-1' >{product_name}</div>
                                  )
                              }
                          )}
                          </div>
                          </>
                      )
                  }
              )}
              </div>
            )}
          </Jumbotron>
        </div>
      </div>
    </>
  );
};

export default GetOrder;
