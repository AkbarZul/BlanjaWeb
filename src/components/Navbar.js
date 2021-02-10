import React, { useState } from "react";
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputRef = React.useRef();
  const onKeyPressHandler = (event) => {
    axios.get(`${process.env.REACT_APP_URL}/search?keyword=${inputRef.current.value}`)
    .then((res) => {

    })
    .catch((err) => {

    })
    
    if (event.key === "Enter") {
      window.location.href = `${process.env.REACT_APP_URL}/search?keyword=${inputRef.current.value}`;
    }
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

  if (isLogout === true) {
    return <Redirect to="/login"/>
  }
  return (
    <>
      <div className="shadow p-3 mb-5 bg-white sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <div className="col-sm-2 col-lg-2 gap">
              <Link to="/">
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
            <button type="submit" className="color-1 mr-3"></button>
            <button type="submit" className="color-2 mr-3"></button>
            <button type="submit" className="color-3 mr-3"></button>
            <button type="submit" className="color-4 mr-3 "></button>
            <button type="submit" className="color-5 mr-3 "></button>
            <button type="submit" className="color-6 mr-3 "></button>
          </div>
        </Modal.Body>

        <Modal.Header>
          <Modal.Title className="ml-6">Size</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex">
            <button type="submit" className="size mr-3">
              XS
            </button>
            <button type="submit" className="size mr-3">
              S
            </button>
            <button type="submit" className="size mr-3">
              M
            </button>
            <button type="submit" className="size mr-3">
              L
            </button>
            <button type="submit" className="size mr-3">
              XL
            </button>
          </div>
        </Modal.Body>

        <Modal.Header>
          <Modal.Title className="ml-6">Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex">
            <button className="category mr-3">All</button>
            <button className="category mr-3">Women</button>
            <button className="category mr-3">Men</button>
          </div>
          <div className="d-flex">
            <button className="category mr-3 mt-2">Boys</button>
            <button className="category mr-3 mt-2">Girls</button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex justify-content-center">
            <button className="discard mr-3" onClick={handleClose}>
              Discard
            </button>
            <button className="discard mr-4" onClick={handleClose}>
              Apply
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;


// import React, { useState, useEffect } from "react";
// import { Modal } from "react-bootstrap";
// import { Logo } from "../assets/style";
// import { Link, useHistory } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
// import { useSelector, useDispatch } from "react-redux";
// import { authLogOutCreator } from "../redux/actions/auth";
// import "./Navbar/style";
// import "../assets/style/style.css";
// import SearchBar from "./SearchBar/SearchBar";
// import axios from "axios";
// import { API } from "../utility/Auth";
// // import Img from './ImgWithContainer/'

// // class Navbar extends Component {
// const Navbar = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [isNavCollapsed, setIsNavCollapsed] = useState(true);
//   const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
//   const isLogin = useSelector((state) => state.auth.data.user_id);
//   console.log("ISLOGIN", isLogin);
//   const token = useSelector((state) => state.auth.data.token);

//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const inputRef = React.useRef();
//   const onKeyPressHandler = (event) => {
//     if (event.key === "Enter") {
//       window.location.href = `http://localhost:3000/search?name=${inputRef.current.value}`;
//     }
//   };

//   const handleLogout = () => {
//     axios
//       .delete(`${API}/auth/logout`, {
//         headers: {
//           "x-access-token": "Bearer " + token,
//         },
//       })
//       .then(({ data }) => {
//         dispatch(authLogOutCreator());
//         history.push("/login");
//         console.log("done", data);
//         // return <Redirect to={{ pathname: "/login" }} />
//       })
//       .catch((err) => {
//         console.log("error", err);
//       });
//   };

//   return (
//     <div>
//       <div className="shadow p-3 mb-5 bg-white rounded">
//         <nav className="navbar navbar-expand-lg navbar-light bg-white">
//           <div className="container">
//             <Link to="/inputProduct">
//               <div className="logo-brand">
//                 <img src={Logo} alt="logo-shop" />
//                 <h1>Blanja</h1>
//               </div>
//             </Link>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-toggle="collapse"
//               data-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded={!isNavCollapsed ? true : false}
//               aria-label="Toggle navigation"
//               onClick={handleNavCollapse}
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div
//               class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
//               id="navbarSupportedContent"
//             >
//               <SearchBar refProp={inputRef} onKeyPress={onKeyPressHandler} />
//               <button
//                 className="btn my-2 my-sm-0 fal fa-filter filter"
//                 variant="link"
//                 onClick={handleShow}
//               />
//               <div className="navbar-nav ml-auto"></div>
//               <div className="shopping">
//                 <Link to={"/mybag"}>
//                   <button
//                     variant="link"
//                     className="btn my-2 my-sm-2 my-md-2 far fa-shopping-cart"
//                     id="shopping"
//                     type="submit"
//                   ></button>
//                 </Link>
//               </div>
//               {isLogin === undefined ? (
//                 <>
//                   <Link to="/login">
//                     <div className="login">
//                       <button
//                         type="submit"
//                         className="btn-login btn my-2 my-sm-2"
//                       >
//                         Login
//                       </button>
//                     </div>
//                   </Link>
//                   <Link to="/login">
//                     <div className="signup">
//                       <button
//                         type="submit"
//                         className="btn-signup btn my-2 my-sm-2"
//                       >
//                         Sign Up
//                       </button>
//                     </div>
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <div className="login">
//                     <button
//                       type="submit"
//                       className="btn-login btn my-2 my-sm-2"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </div>
//                   <div className="signup">
//                     <FontAwesomeIcon
//                       style={{ margin: "0 20px", color: "#eaeaea" }}
//                       icon={faBell}
//                     />
//                     <FontAwesomeIcon
//                       style={{ margin: "0 20px", color: "#eaeaea" }}
//                       icon={faEnvelope}
//                     />
//                     <div className="dp-profil-nav">
//                       <img className="img-profil-nav" alt="" />
//                     </div>
//                   </div>
//                 </>
//               )}
//               {/* <Link to="/login">
//                 <div className="login">
//                   <button type="submit" className="btn-login btn my-2 my-sm-2">
//                     Login
//                   </button>
//                 </div>
//               </Link>
//               <div className="signup">
//                 <button type="submit" className="btn-signup btn my-2 my-sm-2">
//                   Sign Up
//                 </button>
//               </div> */}
//             </div>
//           </div>
//         </nav>
//       </div>

//       <Modal show={show} onHide={handleClose} animation={true}>
//         <Modal.Header closeButton>
//           <Modal.Title>Filter</Modal.Title>
//         </Modal.Header>
//         <Modal.Header>
//           <Modal.Title className="ml-6">Color</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="d-flex">
//             <button type="submit" className="color-1 mr-3"></button>
//             <button type="submit" className="color-2 mr-3"></button>
//             <button type="submit" className="color-3 mr-3"></button>
//             <button type="submit" className="color-4 mr-3 "></button>
//             <button type="submit" className="color-5 mr-3 "></button>
//             <button type="submit" className="color-6 mr-3 "></button>
//           </div>
//         </Modal.Body>

//         <Modal.Header>
//           <Modal.Title className="ml-6">Size</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <div className="d-flex">
//             <button type="submit" className="size mr-3">
//               XS
//             </button>
//             <button type="submit" className="size mr-3">
//               S
//             </button>
//             <button type="submit" className="size mr-3">
//               M
//             </button>
//             <button type="submit" className="size mr-3">
//               L
//             </button>
//             <button type="submit" className="size mr-3">
//               XL
//             </button>
//           </div>
//         </Modal.Body>

//         <Modal.Header>
//           <Modal.Title className="ml-6">Category</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <div className="d-flex">
//             <button className="category mr-3">All</button>
//             <button className="category mr-3">Women</button>
//             <button className="category mr-3">Men</button>
//           </div>
//           <div className="d-flex">
//             <button className="category mr-3 mt-2">Boys</button>
//             <button className="category mr-3 mt-2">Girls</button>
//           </div>
//         </Modal.Body>

//         <Modal.Footer>
//           <div className="d-flex justify-content-center">
//             <button className="discard mr-3" onClick={handleClose}>
//               Discard
//             </button>
//             <button className="discard mr-4" onClick={handleClose}>
//               Apply
//             </button>
//           </div>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Navbar;
