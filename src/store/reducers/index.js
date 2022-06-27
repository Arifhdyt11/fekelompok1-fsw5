import { combineReducers } from "redux";
import ProductReducer from "./product";
import RegisterReducer from "./register";
import AuthReducer from "./auth";

export default combineReducers({
  ProductReducer,
  RegisterReducer,
  AuthReducer,
});
