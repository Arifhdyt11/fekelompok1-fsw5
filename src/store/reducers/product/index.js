import { GET_LIST_PRODUCT, ADD_REGISTER } from "store/types";

const initialState = {
  getListProductResult: false,
  getListProductLoading: false,
  getListProductError: false,

  addRegisterResult: false,
  addRegisterLoading: false,
  addRegisterError: false,
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PRODUCT:
      console.log("4. Masuk Reducer");
      return {
        ...state,
        getListProductResult: action.payload.data,
        getListProductLoading: action.payload.loading,
        getListProductError: action.payload.errorMessage,
      };
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

export default product;
