import axios from "axios";
import { GET_KOTA, GET_PROVINSI } from "store/types";

export const getProvinsi = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_PROVINSI,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "GET",
      url: `http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_PROVINSI,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //error get api
        dispatch({
          type: GET_PROVINSI,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getKota = (id) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_KOTA,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "GET",
      url: `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_KOTA,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //error get api
        dispatch({
          type: GET_KOTA,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
