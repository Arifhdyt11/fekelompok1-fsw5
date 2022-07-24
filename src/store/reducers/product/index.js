import {
  GET_LIST_PRODUCT,
  GET_PRODUCT_ID,
  GET_LIST_PRODUCT_SELLER,
  GET_PRODUCT_ID_SELLER,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "store/types";

const initialState = {
  getListProductResult: false,
  getListProductLoading: false,
  getListProductError: false,

  getProductIdResult: false,
  getProductIdLoading: false,
  getProductIdError: false,

  getListProductSellerResult: false,
  getListProductSellerLoading: false,
  getListProductSellerError: false,

  getProductSellerIdResult: false,
  getProductSellerIdLoading: false,
  getProductSellerIdError: false,

  addProductResult: false,
  addProductLoading: false,
  addProductError: false,

  updateProductResult: false,
  updateProductLoading: false,
  updateProductError: false,

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

    case GET_LIST_PRODUCT_SELLER:
      return {
        ...state,
        getListProductSellerResult: action.payload.data,
        getListProductSellerLoading: action.payload.loading,
        getListProductSellerError: action.payload.errorMessage,
      };

    case GET_PRODUCT_ID_SELLER:
      return {
        ...state,
        getProductIdSellerResult: action.payload.data,
        getProductIdSellerLoading: action.payload.loading,
        getProductIdSellerError: action.payload.errorMessage,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        addProductResult: action.payload,
        addProductLoading: action.payload,
        addProductError: action.payload,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        updateProductResult: action.payload.data,
        updateProductLoading: action.payload.loading,
        updateProductError: action.payload.errorMessage,
      };
    case DELETE_PRODUCT:
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
