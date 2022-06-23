import { GET_LIST_PRODUCT, ADD_REGISTER } from "store/types";
import axios from "axios";

export const getListProduct = () => {
  console.log("2. Masuk Action");
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
      url: `${process.env.REACT_APP_HOST}`,
      timeout: 120000,
    })
      .then((response) => {
        console.log("3. Berhasil Dapat Data", response.data);
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
        console.log("3. Gagal Dapat Data", error.message);
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

// add
export const addRegister = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_REGISTER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // get API
    axios({
      method: "POST",
      url: "https://62b2d81c4f851f87f44e0d48.mockapi.io/register",
      // url: `${process.env.REACT_APP_HOST_REGIS}`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        dispatch({
          // get data
          type: ADD_REGISTER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        // error
        dispatch({
          type: ADD_REGISTER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
