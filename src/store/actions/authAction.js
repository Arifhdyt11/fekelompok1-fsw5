import { AUTH_ERROR, LOGIN, LOGOUT } from "store/types";

export const loginViaForm = (data) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    const userInfo = await fetch("http://localhost:5000/api/v1/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${result.token}`,
      },
    });
    const user = JSON.parse(JSON.stringify(await userInfo.json()));

    if (result.token) {
      dispatch({
        type: LOGIN,
        payload: result.token,
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
