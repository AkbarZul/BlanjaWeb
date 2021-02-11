import React, { useState, useEffect } from "react";
import { Jumbotron, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../SidebarProfile/Sidebar";
import Navbar from "../Navbar";
import "./add.css";
import { API } from "../../utility/Auth";

const AddProduct = () => {
  useEffect(() => {
    getCategory();
    getSize();
    getColor();
    getCondition();
    getStatus();
  }, []);

  //   const api = `http://localhost:8007/products`;
  const shouldCheckedOnStyle = (id) => {
    const result = size.find((s) => s.id == id && s.is_selected);
    return result;
  };

  const shouldColorCheckedOnStyle = (id) => {
    const result = color.find((c) => c.id == id && c.is_selected);
    return result;
  };

  const addOrRemoveSelected = (id) => {
    const result = size.find((s) => s.id == id);
    if (result.is_selected) {
      const temp = size;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]["is_selected"] = false;
      setSize([...temp]);
    } else {
      const temp = size;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]["is_selected"] = true;
      setSize([...temp]);
    }
  };

  const addOrRemoveColorSelected = (id) => {
    const result = color.find((c) => c.id == id);
    if (result.is_selected) {
      const temp = color;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]["is_selected"] = false;
      SetColor([...temp]);
    } else {
      const temp = color;
      const index = temp.findIndex((e) => e.id == id);
      temp[index]["is_selected"] = true;
      SetColor([...temp]);
    }
  };

  console.log("ini warna", addOrRemoveColorSelected);
  console.log("ini size", addOrRemoveSelected);

  const restructureIsSelected = async (data) => {
    const temp = await data.map((data) => {
      data["is_selected"] = false;
      return data;
    });
    return temp;
  };

  const [product, setProduct] = useState({
    product_name: "",
  });
  const [filePath, setFilePath] = useState([]);
  const [prodName, setProdName] = useState("");
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, SetColor] = useState([]);
  const [condition, setCondition] = useState([]);
  const [prodPrice, setProdPrice] = useState("");
  const [prodQty, setProdQty] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [status, setStatus] = useState([]);
  const [ctg, setCtg] = useState(0);
  const [cnd, setCnd] = useState(0);
  const [sts, setSts] = useState(0);

  const token = useSelector((state) => state.auth.data.token);

  const formatDataSizeToSend = (dataSize) => {
    const selectedSizes = [];
    dataSize.forEach((s) => {
      if (s.is_selected) {
        selectedSizes.push(s.id);
      }
    });
    return selectedSizes;
  };

  const formatDataColorToSend = (dataColor) => {
    const selectedColors = [];
    dataColor.forEach((c) => {
      if (c.is_selected) {
        selectedColors.push(c.id);
      }
    });
    return selectedColors;
  };

  const getCategory = async () => {
    await axios
      .get(API + "/categories")
      .then((res) => {
        const categories = res.data.data;
        setCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSize = async () => {
    await axios
      .get(API + "/sizes")
      .then((res) => {
        const size = res.data.data;
        setSize(restructureIsSelected(size));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getColor = async () => {
    await axios
      .get(API + "/colors")
      .then((res) => {
        const color = res.data.data;
        SetColor(restructureIsSelected(color));
        console.log("color", color);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCondition = async () => {
    await axios
      .get(API + "/condition")
      .then((res) => {
        const condition = res.data.data;
        console.log("kondisi", condition);
        setCondition(condition);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatus = async () => {
    await axios
      .get(API + "/status")
      .then((res) => {
        const status = res.data.data;
        console.log("status", status);
        setStatus(status);
      })
      .catch((err) => {
        console.log("error status", err);
      });
  };

  // const colorOpe = [...color];

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("product_name", prodName);
    data.append("category_id", ctg);
    console.log("CATEGORY ", ctg);
    formatDataSizeToSend(size).map((element) => {
      data.append("sizes[]", JSON.stringify(element));
    });
    formatDataColorToSend(color).map((element) => {
      data.append("colors[]", JSON.stringify(element));
    });
    data.append("condition_id", cnd);
    data.append("product_price", prodPrice);
    data.append("product_qty", prodQty);
    data.append("product_desc", prodDesc);
    for (let i = 0; i < filePath.length; i++) {
      data.append("image", filePath[i]);
    }
    data.append("status_product_id", sts);
    console.log(data);
    await axios
      .post(API + "/products", data, {
        header: {
          "x-access-token": "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("bisa post", res);
      })
      .catch((err) => {
        console.log("bisa error", err);
      });
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="container-selling">
          <Form>
            <Jumbotron className="container-content">
              <h3>Inventory</h3>
              <hr></hr>

              <div className="row">
                <div className="col-md-8">
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label className="font-p-title">
                      Name of goods
                    </Form.Label>
                    <Form.Control placeholder="" />
                  </Form.Group>
                </div>
              </div>
            </Jumbotron>
            <Jumbotron className="container-gap">
              <h3>Item details</h3>
              <hr></hr>

              <div className="row">
                <div className="col-md-8">
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label className="font-p-title">Unit Price</Form.Label>
                    <Form.Control placeholder="" />
                  </Form.Group>
                  <Form.Group controlId="formGridAddress1">
                    <Form.Label className="font-p-title">Stock</Form.Label>
                    <Form.Control placeholder="" />
                  </Form.Group>
                  <div className="form-group">
                    <label>Category </label>
                    <br></br>
                    <select
                      id="cat_updt"
                      className="form-control col-6"
                      // onChange={this.optCatcher}
                    >
                      {categories &&
                        categories.map(({ id_categories, category_name }) => {
                          return (
                            <>
                              <option value={id_categories}>
                                {category_name}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Colors </label>
                    <br></br>
                    <select
                      // id="cat_updt"
                      className="form-control col-6"
                      // onChange={this.optCatcher}
                      onClick={addOrRemoveColorSelected(color.id)}
                      multiple
                    >
                      {color &&
                        color.map(({ id, color_name }) => {
                          return (
                            <>
                              <option value={id}>{color_name}</option>
                            </>
                          );
                        })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Size </label>
                    <br></br>
                    <select
                      // id="cat_updt"
                      className="form-control col-6"
                      // onChange={this.optCatcher}
                      onClick={addOrRemoveSelected(size.id)}
                      multiple
                    >
                      {size &&
                        size.map(({ id, size }) => {
                          return (
                            <>
                              <option value={id}>{size}</option>
                            </>
                          );
                        })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Conditions Product </label>
                    <br></br>
                    <select
                      // id="cat_updt"
                      className="form-control col-6"
                      // onChange={this.optCatcher}
                    >
                      {condition &&
                        condition.map(({ id, conditions }) => {
                          return (
                            <>
                              <option value={id}>{conditions}</option>
                            </>
                          );
                        })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status Product </label>
                    <br></br>
                    <select
                      id="cat_updt"
                      className="form-control col-6"
                      // onChange={this.optCatcher}
                    >
                      {status &&
                        status.map(({ id, name }) => {
                          return (
                            <>
                              <option value={id}>{name}</option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
            </Jumbotron>
            <Jumbotron className="container-gap">
              <h3>Photo of goods</h3>
              <Form>
                <Form.Group>
                  <Form.File id="exampleFormControlFile1" label="Your Photo" />
                </Form.Group>
              </Form>
              <hr></hr>

              <div className="row">
                <div className="col-md-8"></div>
              </div>
            </Jumbotron>

            <Jumbotron className="container-gap">
              <h3>Description</h3>
              <hr></hr>

              <div className="row">
                <div className="col-md-8"></div>
              </div>
            </Jumbotron>
            <div className="container-btn d-flex justify-content-end mb-5">
              <div className="btn-login-nav">Jual</div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
