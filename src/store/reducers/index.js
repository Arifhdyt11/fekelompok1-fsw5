import { combineReducers } from "redux";
import ProductReducer from "./product";
import RegisterReducer from "./register";
import AuthReducer from "./auth";
import CategoryReducer from "./category";
import SizeReducer from "./size";
import ChangePasswordReducer from "./changePassword";
import WishlistReducer from "./wishlist";
import TransactionReducer from "./transaction";
import NotificationReducer from "./notification";
import CityReducer from "./city";

export default combineReducers({
  RegisterReducer,
  AuthReducer,
  ChangePasswordReducer,
  CategoryReducer,
  ProductReducer,
  SizeReducer,
  WishlistReducer,
  TransactionReducer,
  NotificationReducer,
  CityReducer,
});
