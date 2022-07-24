import { ADD_REGISTER } from "store/types";
import axios from "axios";
import { handleSwal } from "utils/sweetAlert";

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
      url: `${process.env.REACT_APP_HOST}/register`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        handleSwal("Registration Successful!", "success").then(function () {
          window.location = "/login";
        });
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
        handleSwal(error.response.data.message, "error");
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
