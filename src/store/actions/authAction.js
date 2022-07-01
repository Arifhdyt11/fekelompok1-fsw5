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
      alert("Login Successful");
    } else {
      authError(result.error);
      alert("Login Failed");
    }
  } catch (error) {
    authError(error);
    alert("Email or Password is incorrect");
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
  alert("Logout Successful");
};

export const updateUserDetail = (data) => async (dispatch) => {
  console.log("actions : ", data);
  try {
    var raw = JSON.stringify({
      name: data.name,
      city: data.city,
      address: data.address,
      phone: data.phone,
      image: data.image,
    });

    const response = await fetch(
      `https://shoesnarian.herokuapp.com/api/v1/profile`,
      {
        method: "PUT",
        body: raw,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const result = await response.json();
    console.log("3. Berhasil dapet data:", result);

    dispatch({
      type: UPDATE_PROFILE,
      user: result.data,
      status: true,
    });
  } catch (error) {
    authError(error);
  }
};
