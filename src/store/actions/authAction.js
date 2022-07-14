import Swal from "sweetalert2";
import { AUTH_ERROR, LOGIN, LOGOUT, UPDATE_PROFILE } from "store/types";

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

    const userInfo = await fetch(`${process.env.REACT_APP_HOST}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${result.accessToken}`,
      },
    });
    const user = JSON.parse(JSON.stringify(await userInfo.json()));
    console.log(`Token user ${result.accessToken}`);

    if (result.accessToken) {
      dispatch({
        type: LOGIN,
        payload: result.accessToken,
        user: user,
      });
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log(result);
      authError(result.error);
      Swal.fire({
        icon: "error",
        title: `${result.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    authError(error);
    Swal.fire({
      icon: "error",
      title: `${error}`,
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
  Swal.fire({
    icon: "info",
    title: "Logout Successful",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const updateUserDetail = (data) => async (dispatch) => {
  try {
    var formdata = new FormData();
    if (data.image) {
      formdata.append("image", data.image);
    }
    formdata.append("name", data.name);
    formdata.append("city", data.city);
    formdata.append("address", data.address);
    formdata.append("phone", data.phone);

    const response = await fetch(`${process.env.REACT_APP_HOST}/profile`, {
      method: "PUT",
      body: formdata,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const result = await response.json();
    console.log("3. Berhasil dapet data:", result);
    window.location.href = "/";
    dispatch({
      type: UPDATE_PROFILE,
      user: result,
      status: true,
    });
  } catch (error) {
    authError(error);
  }
};

export const loginWithGoogle = (accessToken) => async (dispatch) => {
  try {
    const data = {
      access_token: accessToken,
    };
    const response = await fetch("http://localhost:8000/api/v1/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(data);
    console.log(result);

    // profile
    const userInfo = await fetch("http://localhost:8000/api/v1/profile", {
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
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/";
    } else {
      authError(result.error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    authError(error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Login Failed",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
