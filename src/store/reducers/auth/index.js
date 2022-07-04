import { AUTH_ERROR, LOGIN, LOGOUT, UPDATE_PROFILE } from "store/types";

const initialState = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken"),
  user: JSON.parse(localStorage.getItem("user")),
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("accessToken", action.payload);
      localStorage.setItem("user", JSON.stringify(action.user));

      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload,
        user: action.user,
        error: null,
      };
    case LOGOUT:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        error: null,
      };
    case UPDATE_PROFILE:
      console.log("reducer : ", action);
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        ...state,
        user: action.user,
        status: action.status,
      };
    case AUTH_ERROR:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
