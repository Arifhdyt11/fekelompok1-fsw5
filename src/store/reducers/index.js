import { combineReducers } from "redux";
import ProductReducer from "./product";
import RegisterReducer from "./register";

export default combineReducers({
  ProductReducer,
  RegisterReducer,
});
