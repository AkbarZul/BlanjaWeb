import Axios from "axios";
// import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = `http://localhost:2005`;

export const authLogin = (email, password) => {
  const URI = `${API}/auth/login`;
  return Axios.post(URI, { email: email, password: password });
};

export const authRegister = (data) => {
  const URI = `${API}/auth/register`;
  return Axios.post(URI, data);
};
