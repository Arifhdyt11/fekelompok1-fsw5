import {
  NOTIFICATION_BUYER,
  NOTIFICATION_SELLER,
  UPDATE_NOTIFICATION_BUYER,
  UPDATE_NOTIFICATION_SELLER,
} from "store/types";

const initialState = {
  getNotificationBuyerResult: false,
  getNotificationBuyerLoading: false,
  getNotificationBuyerError: false,

  getNotificationSellerResult: false,
  getNotificationSellerLoading: false,
  getNotificationSellerError: false,

  updateNotificationBuyerResult: false,
  updateNotificationBuyerLoading: false,
  updateNotificationBuyerError: false,

  updateNotificationSellerResult: false,
  updateNotificationSellerLoading: false,
  updateNotificationSellerError: false,
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_BUYER:
      return {
        ...state,
        getNotificationBuyerResult: action.payload.data,
        getNotificationBuyerLoading: action.payload.loading,
        getNotificationBuyerError: action.payload.errorMessage,
      };

    case NOTIFICATION_SELLER:
      return {
        ...state,
        getNotificationSellerResult: action.payload.data,
        getNotificationSellerLoading: action.payload.loading,
        getNotificationSellerError: action.payload.errorMessage,
      };

    case UPDATE_NOTIFICATION_BUYER:
      return {
        ...state,
        updateNotificationBuyerResult: action.payload.data,
        updateNotificationBuyerLoading: action.payload.loading,
        updateNotificationBuyerError: action.payload.errorMessage,
      };

    case UPDATE_NOTIFICATION_SELLER:
      return {
        ...state,
        updateNotificationSellerResult: action.payload.data,
        updateNotificationSellerLoading: action.payload.loading,
        updateNotificationSellerError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default category;
