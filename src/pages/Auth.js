import React, { useState } from "react";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import ResetPassword from "../components/Login/KonfirmasiPassword";

const Auth = () => {
  const [compLogin, setCompLogin] = useState("login");
  const changeToRegister = () => setCompLogin("register");
  const changeToLogin = () => setCompLogin("login");
  const changeToReset = () => setCompLogin("reset");
  return (
    <>
      {compLogin === "login" ? (
        <Login
          changeToRegister={changeToRegister}
          changeToReset={changeToReset}
        />
      ) : compLogin === "register" ? (
        <Register changeToLogin={changeToLogin} />
      ) : (
        <ResetPassword changeToRegister={changeToRegister} />
      )}
      {/* <ResetPassword changeToRegister={changeToRegister} /> */}
    </>
  );
};

export default Auth;
