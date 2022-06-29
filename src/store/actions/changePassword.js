import axios from "axios";
import { CHANGE_PASSWORD } from "store/types";

// CHANGE PASSWORD
export const changePassword = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: CHANGE_PASSWORD,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // TODO: access Tokennnya disini
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    // get API
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_HOST}/change-password`,
      timeout: 120000,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        dispatch({
          // get data
          type: CHANGE_PASSWORD,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
        console.log(data);
      })
      .catch((error) => {
        // error
        dispatch({
          type: CHANGE_PASSWORD,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};