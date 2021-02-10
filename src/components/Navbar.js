import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Logo } from "../assets/style";
import { Link } from "react-router-dom";
import Login from "../components/Auth/Login/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { authLogOutCreator } from "../redux/actions/auth";
import "../assets/style/style.css";
import "./Navbar/style.css";
import SearchBar from "./SearchBar/SearchBar";
import { Redirect } from "react-router-dom";
import axios from "axios";
// import Img from './ImgWithContainer/'

// class Navbar extends Component {
const Navbar = () => {
  const dispatch = useDispatch();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const isLogin = useSelector((state) => state.auth.isFulfilled);
  const token = useSelector((state) => state.auth.data.token);
  const [show, setShow] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [listCategory, setListCategory] = useState("");
  const [listSize, setListSize] = useState("");
  const [listColor, setListColor] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [getFilter, setGetFilter] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputRef = React.useRef();
  const onKeyPressHandler = (event) => {
    if (event.key === "Enter") {
      window.location.href = `${process.env.REACT_APP_URL}/search?keyword=${inputRef.current.value}`;
    }
  };

  const handleFilter = () => {
    axios
      .get(
        `${process.env.REACT_APP_URL}/products/filter?category=${category}&size=${size}&color=${color}`
      )
      .then((res) => {
        const filter = res.data.data;
        setGetFilter(filter)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/categories`)
      .then((res) => {
        const getCategory = res.data.data;
        setListCategory(getCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSizes = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/sizes`)
      .then((res) => {
        const getSize = res.data.data;
        console.log("kolor size", getSize);
        setListSize(getSize);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getColors = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/colors`)
      .then((res) => {
        const getColor = res.data.data;
        console.log("kolor", getColor);
        setListColor(getColor);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    axios
      .delete(process.env.REACT_APP_URL + "/auth/logout", {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then(async (res) => {
        dispatch(authLogOutCreator());
        setIsLogout(true);
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getColors();
    getCategories();
    getSizes();
  }, []);

  if (isLogout === true) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div className="shadow p-3 mb-5 bg-white sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <div className="col-sm-2 col-lg-2 gap">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="logo-brand">
                  <img src={Logo} alt="logo-shop" />
                  <h1>Blanja</h1>
                </div>
              </Link>
            </div>
            <button
              className="navbar-toggler  float-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={!isNavCollapsed ? true : false}
              aria-label="Toggle navigation"
              onClick={handleNavCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="col-sm-10 col-lg-10 d-flex flex-row gap"
              class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
              id="navbarSupportedContent"
            >
              <div className="col-sm-12 col-lg-7 gap">
                <div className="d-flex flex-row align-items-center">
                  <SearchBar
                    refProp={inputRef}
                    onKeyPress={onKeyPressHandler}
                  />
                  <button
                    className="btn my-2 my-sm-0 fal fa-filter filter"
                    variant="link"
                    onClick={handleShow}
                  ></button>
                  {/* <div className="navbar-nav ml-auto"></div> */}
                  <div className="shopping">
                    <Link to={"/mybag"}>
                      <button
                        variant="link"
                        className="btn my-2 my-sm-2 my-md-2 far fa-shopping-cart"
                        id="shopping"
                        type="submit"
                      ></button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-5 gap">
                {isLogin != true ? (
                  <>
                    <div className="align-items-center d-flex justify-content-end">
                      <Link to="/login">
                        <div className="login">
                          <button
                            type="submit"
                            className="btn-login btn my-2 my-sm-2"
                          >
                            Login
                          </button>
                        </div>
                      </Link>
                      <div className="signup">
                        <button
                          type="submit"
                          className="btn-signup btn my-2 my-sm-2"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* <Link to="/login"> */}
                    {/* </Link> */}
                    <div className="align-items-center d-flex justify-content-around">
                      {/* <div className="d-flex flex-row" justi> */}
                      <FontAwesomeIcon
                        style={{ color: "#d4d4d4" }}
                        icon={faBell}
                      />
                      <FontAwesomeIcon
                        style={{ color: "#d4d4d4" }}
                        icon={faEnvelope}
                      />
                      <div className="dp-profil-nav">
                        <img className="img-profil-nav" alt="" />
                      </div>
                      {/* </div> */}
                      {/* <Link to="/login"> */}
                      <div className="login">
                        <button
                          type="submit"
                          className="btn-login btn my-2 my-sm-2"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                      {/* </Link> */}
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* <Link to="/login">
                <div className="login">
                  <button type="submit" className="btn-login btn my-2 my-sm-2">
                    Login
                  </button>
                </div>
              </Link>
              <div className="signup">
                <button type="submit" className="btn-signup btn my-2 my-sm-2">
                  Sign Up
                </button>
              </div> */}
          </div>
        </nav>
      </div>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Header>
          <Modal.Title className="ml-6">Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            {listColor &&
              listColor.map(({ id, color_name, color_hexa }) => {
                return (
                  <button
                    type="submit"
                    className="mr-3"
                    style={{width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "none", backgroundColor: color_hexa }}
                      onClick={() => setColor(color_name)}
                  ></button>
                );
              })}
          </div>
        </Modal.Body>

        <Modal.Header>
          <Modal.Title className="ml-6">Size</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="col-12 ">
            {listSize &&
              listSize.map(({ size }) => {
                return (
                  <button type="submit" className="size mr-3" onCLick={() => setSize(size)}>
                    {size}
                  </button>
                );
              })}
            
          </div>
        </Modal.Body>

        <Modal.Header>
          <Modal.Title className="ml-6">Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex">
            <button className="category mr-3" onClick={(category) => setCategory(category)}>All</button>
            {listCategory && listCategory.map(({id, category_name}) => {
              return (

                <button className="category mr-3" on={() => setCategory(category_name)}>{category_name}</button>
              )
            })}
 
          </div>
          
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex justify-content-center">
            <button className="discard mr-3" onClick={handleClose}>
              Discard
            </button>
            <button className="discard mr-4" onClick={handleFilter, handleClose}>
              Apply
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;