import { AUTH_ERROR, LOGIN, LOGOUT, UPDATE_PROFILE } from "store/types";
import { handleSwal } from "utils/sweetAlert";

export const loginViaForm = (data) => async (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
    user: false,
  });

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
      handleSwal("Login Successful!", "success");
      dispatch({
        type: LOGIN,
        payload: {
          loading: false,
          data: result.accessToken,
          errorMessage: false,
        },
        user: user,
      });
    } else {
      // console.log(result);
      dispatch({
        type: LOGIN,
        payload: {
          loading: false,
          data: false,
          errorMessage: result.message,
        },
        user: false,
      });
      dispatch({
        type: AUTH_ERROR,
        payload: {
          loading: false,
          data: false,
          errorMessage: result.message,
        },
        user: false,
      });

      handleSwal(result.message, "error");
    }
  } catch (error) {
    dispatch({
      type: LOGIN,
      payload: {
        loading: false,
        data: false,
        errorMessage: error,
      },
      user: false,
    });
    dispatch({
      type: AUTH_ERROR,
      payload: {
        loading: false,
        data: false,
        errorMessage: error,
      },
      user: false,
    });
    handleSwal(error, "error");
  }
};

const authError = (error) => async (dispatch) => {
  dispatch({
    type: AUTH_ERROR,
    payload: {
      loading: false,
      data: false,
      errorMessage: error.message,
    },
    user: false,
  });

  setTimeout(() => {
    dispatch({
      type: AUTH_ERROR,
      payload: {
        loading: false,
        data: false,
        errorMessage: error.message,
      },
      user: false,
    });
  }, 5000);
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  handleSwal("Logout Successful", "success");
};

export const updateUserDetail = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE,
    loading: true,
    user: JSON.parse(localStorage.getItem("user")),
    status: true,
  });
  try {
    var formdata = new FormData();
    if (data.image) {
      formdata.append("image", data.image);
    }
    formdata.append("name", data.name);
    formdata.append("province", data.province);
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
    if (result.data.role === "SELLER") {
      handleSwal("Data Berhasil Di Update", "success").then(function () {
        window.location.href = "/seller";
      });
    } else {
      handleSwal("Data Berhasil Di Update", "success").then(function () {
        window.location.href = "/";
      });
    }
    dispatch({
      type: UPDATE_PROFILE,
      loading: false,
      user: result,
      status: true,
    });
  } catch (error) {
    authError(error);
  }
};

export const loginWithGoogle = (accessToken) => async (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
    user: false,
  });
  try {
    const data = {
      access_token: accessToken,
    };
    const response = await fetch(`${process.env.REACT_APP_HOST}/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    // profile
    const userInfo = await fetch(`${process.env.REACT_APP_HOST}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${result.token}`,
      },
    });
    const user = JSON.parse(JSON.stringify(await userInfo.json()));

    if (result.token) {
      handleSwal("Login Successful!", "success");
      dispatch({
        type: LOGIN,
        payload: {
          loading: false,
          data: result.token,
          errorMessage: false,
        },
        user: user,
      });
      window.location.href = "/";
    } else {
      // authError(result.error);
      dispatch({
        type: LOGIN,
        payload: {
          loading: false,
          data: false,
          errorMessage: result.message,
        },
        user: false,
      });
      dispatch({
        type: AUTH_ERROR,
        payload: {
          loading: false,
          data: false,
          errorMessage: result.message,
        },
        user: false,
      });
      handleSwal("Login Failed!", "error");
    }
  } catch (error) {
    // authError(error);
    dispatch({
      type: LOGIN,
      payload: {
        loading: false,
        data: false,
        errorMessage: error,
      },
      user: false,
    });
    dispatch({
      type: AUTH_ERROR,
      payload: {
        loading: false,
        data: false,
        errorMessage: error,
      },
      user: false,
    });
    handleSwal(error, "error");
  }
};
