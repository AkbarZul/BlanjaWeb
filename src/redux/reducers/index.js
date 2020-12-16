import { combineReducers } from "redux";
import authReducer from "./auth";

const indexReducer = combineReducers({
  auth: authReducer,
});

export default indexReducer;
