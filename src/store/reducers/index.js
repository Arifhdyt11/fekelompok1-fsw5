import { combineReducers } from "redux";
import ProductReducer from "./product";
import RegisterReducer from "./register";
import AuthReducer from "./auth";
import CategoryReducer from "./category";

export default combineReducers({
  ProductReducer,
  RegisterReducer,
  AuthReducer,
  CategoryReducer,
});
