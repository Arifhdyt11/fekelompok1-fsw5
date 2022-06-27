import { GET_LIST_CATEGORY } from "store/types";

const initialState = {
  getListCategoryResult: false,
  getListCategoryLoading: false,
  getListCategoryError: false,
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_CATEGORY:
      return {
        ...state,
        getListCategoryResult: action.payload.data,
        getListCategoryLoading: action.payload.loading,
        getListCategoryError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default category;
