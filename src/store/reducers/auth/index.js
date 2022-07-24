import { AUTH_ERROR, LOGIN, LOGOUT, UPDATE_PROFILE } from "store/types";

const initialState = {
  isAuthenticated: !!localStorage.getItem("accessToken"),

  // isAuthenticated: false,
  // accessToken: false,
  // user: false,

  isAuthenticatedLoading: false,
  accessToken: localStorage.getItem("accessToken"),
  user: JSON.parse(localStorage.getItem("user")),
  error: null,

  loadingUpdate: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("accessToken", action.payload.data);
      localStorage.setItem("user", JSON.stringify(action.user));

      document.querySelector("body").style.overflow = "auto";

      return {
        ...state,
        isAuthenticated: action.payload.data,
        isAuthenticatedLoading: action.payload.loading,
        accessToken: action.payload.data,
        user: action.user,
        error: null,
      };

    case LOGOUT:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      document.querySelector("body").style.overflow = "auto";

      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        error: null,
      };

    case UPDATE_PROFILE:
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        ...state,
        loadingUpdate: action.loading,
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
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
