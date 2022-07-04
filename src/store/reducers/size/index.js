import {
  GET_LIST_SIZE,
  ADD_SIZE,
  DETAIL_SIZE,
  UPDATE_SIZE,
  DELETE_SIZE,
} from "store/types";

const initialState = {
  getListSizeResult: false,
  getListSizeLoading: false,
  getListSizeError: false,

  addSizeResult: false,
  addSizeLoading: false,
  addSizeError: false,

  detailSizeResult: false,

  deleteSizeResult: false,
  deleteSizeLoading: false,
  deleteSizeError: false,

  updateSizeResult: false,
  updateSizeLoading: false,
  updateSizeError: false,
};

const size = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_SIZE:
      return {
        ...state,
        getListSizeResult: action.payload.data,
        getListSizeLoading: action.payload.loading,
        getListSizeError: action.payload.errorMessage,
      };
    case ADD_SIZE:
      return {
        ...state,
        addSizeResult: action.payload.data,
        addSizeLoading: action.payload.loading,
        addSizeError: action.payload.errorMessage,
      };

    case DETAIL_SIZE:
      return {
        ...state,
        detailSizeResult: action.payload.data,
      };

    case UPDATE_SIZE:
      return {
        ...state,
        updateSizeResult: action.payload.data,
        updateSizeLoading: action.payload.loading,
        updateSizeError: action.payload.errorMessage,
      };

    case DELETE_SIZE:
      return {
        ...state,
        deleteSizeResult: action.payload.data,
        deleteSizeLoading: action.payload.loading,
        deleteSizeError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default size;
