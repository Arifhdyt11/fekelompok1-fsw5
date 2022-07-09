import {
  GET_LIST_TRANSACTION_BUYER,
  GET_LIST_TRANSACTION_SELLER,
  GET_TRANSACTION_ID_SELLER,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION_SELLER,
} from "store/types";

const initialState = {
  getListTransactionBuyerResult: false,
  getListTransactionBuyerLoading: false,
  getListTransactionBuyerError: false,

  getListTransactionSellerResult: false,
  getListTransactionSellerLoading: false,
  getListTransactionSellerError: false,

  getTransactionIdSellerResult: false,
  getTransactionIdSellerLoading: false,
  getTransactionIdSellerError: false,

  addTransactionResult: false,
  addTransactionLoading: false,
  addTransactionError: false,

  updateTransactionSellerResult: false,
  updateTransactionSellerLoading: false,
  updateTransactionSellerError: false,
};

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_TRANSACTION_BUYER:
      return {
        ...state,
        getListTransactionBuyerResult: action.payload.data,
        getListTransactionBuyerLoading: action.payload.loading,
        getListTransactionBuyerError: action.payload.errorMessage,
      };

    case GET_LIST_TRANSACTION_SELLER:
      return {
        ...state,
        getListTransactionSellerResult: action.payload.data,
        getListTransactionSellerLoading: action.payload.loading,
        getListTransactionSellerError: action.payload.errorMessage,
      };

    case GET_TRANSACTION_ID_SELLER:
      return {
        ...state,
        getTransactionIdSellerResult: action.payload.data,
        getTransactionIdSellerLoading: action.payload.loading,
        getTransactionIdSellerError: action.payload.errorMessage,
      };

    case ADD_TRANSACTION:
      return {
        ...state,
        addTransactionResult: action.payload.data,
        addTransactionLoading: action.payload.loading,
        addTransactionError: action.payload.errorMessage,
      };

    case UPDATE_TRANSACTION_SELLER:
      return {
        ...state,
        updateTransactionSellerResult: action.payload.data,
        updateTransactionSellerLoading: action.payload.loading,
        updateTransactionSellerError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default transaction;
