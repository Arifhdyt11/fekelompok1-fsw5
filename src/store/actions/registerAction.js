import axios from "axios";
import { ADD_REGISTER } from "store/types";
import Swal from "sweetalert2";

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
        dispatch({
          // get data
          type: ADD_REGISTER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
        window.location.href = "/login";
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500,
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
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
};
