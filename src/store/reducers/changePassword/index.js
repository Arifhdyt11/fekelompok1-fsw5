import { CHANGE_PASSWORD } from "store/types";

const initialState = {
  changePasswordResult: false,
  changePasswordLoading: false,
  changePasswordError: false,
};

const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordResult: action.payload.data,
        changePasswordLoading: action.payload.loading,
        changePasswordError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default changePasswordReducer;
