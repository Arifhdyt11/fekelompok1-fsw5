import { combineReducers } from "redux";
import ProductReducer from "./product";
import RegisterReducer from "./register";
import AuthReducer from "./auth";
import CategoryReducer from "./category";
import SizeReducer from "./size";
import ChangePasswordReducer from "./changePassword";

export default combineReducers({
  ProductReducer,
  RegisterReducer,
  AuthReducer,
  CategoryReducer,
  SizeReducer,
  ChangePasswordReducer
});
