import axios from "axios";
import {
  NOTIFICATION_BUYER,
  NOTIFICATION_SELLER,
  UPDATE_NOTIFICATION_BUYER,
  UPDATE_NOTIFICATION_SELLER,
} from "store/types";

export const getNotificationBuyer = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: NOTIFICATION_BUYER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_HOST}/notif/buyer`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: NOTIFICATION_BUYER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //error get api
        dispatch({
          type: NOTIFICATION_BUYER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getNotificationSeller = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: NOTIFICATION_SELLER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_HOST}/notif/seller`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: NOTIFICATION_SELLER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //error get api
        dispatch({
          type: NOTIFICATION_SELLER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const updateNotificationBuyer = (data) => {
  return (dispatch) => {
    //loading
    console.log(data);
    dispatch({
      type: UPDATE_NOTIFICATION_BUYER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_HOST}/notif/buyer`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        //berhasil get API
        console.log(response);
        dispatch({
          type: UPDATE_NOTIFICATION_BUYER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //error get api
        dispatch({
          type: UPDATE_NOTIFICATION_BUYER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const updateNotificationSeller = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: UPDATE_NOTIFICATION_SELLER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_HOST}/notif/seller`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: UPDATE_NOTIFICATION_SELLER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //error get api
        dispatch({
          type: UPDATE_NOTIFICATION_SELLER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
