import { ADD_REGISTER } from "store/types";

const initialState = {
  addRegisterResult: false,
  addRegisterLoading: false,
  addRegisterError: false,
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REGISTER:
      return {
        ...state,
        addRegisterResult: action.payload.data,
        addRegisterLoading: action.payload.loading,
        addRegisterError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default register;
