import axios from "axios";
import { ADD_REGISTER } from "store/types";

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
      url: "http://localhost:3000/api/v1/register",
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
        alert("Registration Successful");
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
        alert("Registration Failed");
      });
  };
};
