import axios from "axios";
import {
  GET_LIST_PRODUCT,
  GET_PRODUCT_ID,
  ADD_PRODUCT,
  DELETE_PRODUCT,
} from "store/types";

export const getListProduct = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_LIST_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_HOST}/product`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_LIST_PRODUCT,
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
          type: GET_LIST_PRODUCT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addProduct = (data) => {
  console.log("2. Masuk Action");
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_HOST}/product`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        console.log("3. Berhasil Dapat Data", response.data);
        //berhasil get API
        dispatch({
          type: ADD_PRODUCT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. Gagal Dapat Data", error.response.data);
        //error get api
        dispatch({
          type: ADD_PRODUCT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const deleteProduct = (id) => {
  console.log("2. Masuk ke action");
  return (dispatch) => {
    dispatch({
      type: DELETE_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "DELETE",
      url: "${process.env.REACT_APP_HOST}/product/" + id,
    })
      .then((response) => {
        console.log("3. Berhasil dapet data:", response);
        //berhasil get api
        dispatch({
          type: DELETE_PRODUCT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. Gagal dapet data : ", error);
        dispatch({
          type: DELETE_PRODUCT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
