import React, { useEffect, useState } from "react";
import { Card, Jumbotron } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../SidebarProfile/Sidebar";
import Navbar from "../Navbar";
import axios from "axios";
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
          <Jumbotron className="container-content" style={{ height: "100%" }}>
            <h3>Your Order</h3>
            <hr></hr>
            {order.length === 0 ? (
              <h1>empty order</h1>
            ) : (
              <div className="container">
                <div className="row d-flex flex-row justify-content-arround">
                  {order.map(
                    ({
                      id,
                      transaction_code,
                      total,
                      status_order,
                      address,
                      product_name,
                    }) => {
                      return (
                        <Card className="card-style">
                          <div className="card-body">
                            <div
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <p>Order No.</p>
                                <p className="card-title">
                                  {transaction_code}
                                </p>
                              </div>
                            </div>
                            <p className="card-text2">{address}</p>
                            <p className="card-text2">{status_order}</p>
                            <p className="card-text">Rp. {total}</p>
                          </div>
                        </Card>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </Jumbotron>
        </div>
      </div>
    </>
  );
};

export default GetOrder;
