import { authLogin, authRegister } from "../../utility/Auth";
import actionAuth from "./actionAuth";

export const authLoginCreator = (email, password) => {
  return {
    type: actionAuth.authLogin,
    payload: authLogin(email, password),
  };
};

export const authRegisterCreator = (data) => {
  return {
    type: actionAuth.authRegister,
    payload: authRegister(data),
  };
};

export const authLogOutCreator = () => {
  return {
    type: actionAuth.authLogOut,
  };
};
