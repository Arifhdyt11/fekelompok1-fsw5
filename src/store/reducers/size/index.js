import { GET_LIST_SIZE, ADD_SIZE } from "store/types";

const initialState = {
  getListSizeResult: false,
  getListSizeLoading: false,
  getListSizeError: false,

  addSizeResult: false,
  addSizeLoading: false,
  addSizeError: false,
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

    default:
      return state;
  }
};

export default size;
