import {
  GET_LIST_PRODUCT,
  GET_PRODUCT_ID,
  ADD_PRODUCT,
  DELETE_PRODUCT,
} from "store/types";

const initialState = {
  getListProductResult: false,
  getListProductLoading: false,
  getListProductError: false,

  getProductIdResult: false,
  getProductIdLoading: false,
  getProductIdError: false,

  addProductResult: false,
  addProductLoading: false,
  addProductError: false,

  deleteProductResult: false,
  deleteProductLoading: false,
  deleteProductError: false,
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PRODUCT:
      return {
        ...state,
        getListProductResult: action.payload.data,
        getListProductLoading: action.payload.loading,
        getListProductError: action.payload.errorMessage,
      };
    case GET_PRODUCT_ID:
      return {
        ...state,
        getProductIdResult: action.payload.data,
        getProductIdLoading: action.payload.loading,
        getProductIdError: action.payload.errorMessage,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        addProductResult: action.payload.data,
        addProductLoading: action.payload.loading,
        addProductError: action.payload.errorMessage,
      };

    case DELETE_PRODUCT:
      console.log("4. Masuk reducer", action);
      return {
        ...state,
        deleteProductResult: action.payload.data,
        deleteProductLoading: action.payload.loading,
        deleteProductError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default product;
