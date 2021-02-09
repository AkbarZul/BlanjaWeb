import Axios from "axios";
// import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const API = process.env.REACT_APP_URL;

export const authLogin = (email, password) => {
  const URI = `${API}/auth/login`;
  return Axios.post(URI, { email: email, password: password });
};

export const authRegister = (data) => {
  const URI = `${API}/auth/register`;
  return Axios.post(URI, data);
};

export const getProductId = (id) => {
  return Axios.get(`${API}/products/${id}`);
};
