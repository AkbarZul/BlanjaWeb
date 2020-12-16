import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authRegisterCreator } from "../../redux/actions/auth";
import { Logo } from "../../assets/style/index";
import "../../assets/style/login.css";

const Register = ({ changeToLogin }) => {
  const dispatch = useDispatch();
  useSelector((state) => state.auth);

  const [role, setRole] = useState(2);

  let reviewSchema = "";
  if (role === 1) {
    reviewSchema = yup.object({
      username: yup.string().required(),
      email: yup.string().required().email(),
      phone_number: yup.number().required(),
      store_name: yup.string().required(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
          "password must be include lowerCase, upperCase, numbers and minimum 8 characters"
        ),
    });
  } else {
    reviewSchema = yup.object({
      username: yup.string().required(),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
          "password must be include lowerCase, upperCase, numbers and minimum 8 characters"
        ),
    });
  }

  let styleBtnCustomer = "btn-custommer";
  if (role === 2) {
    styleBtnCustomer = "btn-custommer-active";
  } else {
    styleBtnCustomer = "btn-custommer";
  }

  let styleBtnSeller = "btn-seller";
  if (role === 1) {
    styleBtnSeller = "btn-seller-active";
  } else {
    styleBtnSeller = "btn-seller";
  }
  return (
    <>
      <section className="home-page">
        <div id="logo">
          <div className="logo-shop">
            <img src={Logo} alt="logo-shop" />
          </div>
          <div className="logo-text">
            <p className="tag-logo">Blanja</p>
          </div>
        </div>
        <h4 className="tag-h4">Please sign up with your account</h4>
        <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
          <button
            type="button"
            className={styleBtnCustomer}
            onClick={() => setRole(2)}
          >
            Customer
          </button>
          <button
            type="button"
            className={styleBtnSeller}
            onClick={() => setRole(1)}
          >
            Seller
          </button>
        </div>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            phone_number: "",
            store_name: "",
          }}
          validationSchema={reviewSchema}
          onSubmit={(values, { resetForm }) => {
            if (role === 1) {
              const data = {
                ...values,
                roles_id: role,
              };
              console.log(data)
              dispatch(authRegisterCreator(data));
              resetForm({ values: "" });
            } else {
              const data = {
                username: values.username,
                email: values.email,
                password: values.password,
                roles_id: role,
              };
              console.log(data);
              dispatch(authRegisterCreator(data));
              resetForm({ values: "" });
            }
          }}
        >
          {(props) => (
            <>
              <form action="" className="tag-form" onSubmit={props.handleSubmit}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  // value={props.values.username}
                />
                <p className="text-red">
                  {props.touched.username && props.errors.username}
                </p>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                />
                <p className="text-red">
                  {props.touched.email && props.errors.email}
                </p>
                <br />
                {role === 1 ?
                  <>
                    <input
                      type="text"
                      name="phone-number"
                      id="phone-number"
                      placeholder="Phone number"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.phone_number}
                    />
                    <p className="text-red">
                      {props.touched.phone_number && props.errors.phone_number}
                    </p>
                    <br />
                    <input
                      type="text"
                      name="store-name"
                      id="store-name"
                      placeholder="Store name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.store_name}
                    />
                    <p className="text-red">
                      {props.touched.store_name && props.errors.store_name}
                    </p>
                    <br />
                  </>
                 : null}
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                />
                <p className="text-red">
                  {props.touched.password && props.errors.password}
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  
                  style={{
                    backgroundColor: "rgba(219, 48, 34, 1)",
                    border: "2px solid rgba(219, 48, 34, 1)",
                  }}
                >
                  Register
                </button>
              </form>
              {/* <div className="button-primary">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={props.handleSubmit}
                  style={{
                    backgroundColor: "rgba(219, 48, 34, 1)",
                    border: "2px solid rgba(219, 48, 34, 1)",
                  }}
                >
                  Register
                </button>
              </div> */}
            </>
          )}
        </Formik>
        <p className="text-register">
          Already have a Tokopedia account?{" "}
          <span className="text-red" onClick={changeToLogin}>
            Login
          </span>
        </p>
      </section>
    </>
  );
};

export default Register;
