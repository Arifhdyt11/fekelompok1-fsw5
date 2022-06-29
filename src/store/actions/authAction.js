import Swal from "sweetalert2";
import { AUTH_ERROR, LOGIN, LOGOUT } from "store/types";

export const loginViaForm = (data) => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);

    const userInfo = await fetch(`${process.env.REACT_APP_HOST}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${result.accessToken}`,
      },
    });
    const user = JSON.parse(JSON.stringify(await userInfo.json()));

    if (result.accessToken) {
      dispatch({
        type: LOGIN,
        payload: result.accessToken,
        user: user,
      });
      // alert("Login Successful");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      authError(result.error);
      // alert("Login Failed");
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    authError(error);
    // alert("Email or Password is incorrect");
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Email or Password is incorrect",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const authError = (error) => async (dispatch) => {
  dispatch({
    type: AUTH_ERROR,
    payload: error.message,
  });

  setTimeout(() => {
    dispatch({
      type: AUTH_ERROR,
      payload: null,
    });
  }, 5000);
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  // alert("Logout Successful");
  Swal.fire({
    position: "top-end",
    icon: "info",
    title: "Logout Successful",
    showConfirmButton: false,
    timer: 1500,
  });
};
