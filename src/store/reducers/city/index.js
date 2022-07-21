import { GET_PROVINSI, GET_KOTA } from "store/types";

const initialState = {
  getProvinsiResult: false,
  getProvinsiLoading: false,
  getProvinsiError: false,

  getKotaResult: false,
  getKotaLoading: false,
  getKotaError: false,
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROVINSI:
      return {
        ...state,
        getProvinsiResult: action.payload.data,
        getProvinsiLoading: action.payload.loading,
        getProvinsiError: action.payload.errorMessage,
      };

    case GET_KOTA:
      return {
        ...state,
        getKotaResult: action.payload.data,
        getKotaLoading: action.payload.loading,
        getKotaError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default category;
