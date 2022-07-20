import axios from "axios";
import Swal from "sweetalert2";

import {
  GET_LIST_TRANSACTION_BUYER,
  GET_LIST_TRANSACTION_SELLER,
  GET_TRANSACTION_ID_SELLER,
  UPDATE_TRANSACTION_SELLER,
  ADD_TRANSACTION,
} from "store/types";

export const getListTransactionBuyer = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_LIST_TRANSACTION_BUYER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get API
    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      url: `${process.env.REACT_APP_HOST}/transaction/buyer`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_LIST_TRANSACTION_BUYER,
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
          type: GET_LIST_TRANSACTION_BUYER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getListTransactionSeller = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_LIST_TRANSACTION_SELLER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get API
    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      url: `${process.env.REACT_APP_HOST}/transaction/seller`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_LIST_TRANSACTION_SELLER,
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
          type: GET_LIST_TRANSACTION_SELLER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getTransactionIdSeller = (transactionId) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_TRANSACTION_ID_SELLER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get API
    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      url: `${process.env.REACT_APP_HOST}/transaction/seller/${transactionId}`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_TRANSACTION_ID_SELLER,
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
          type: GET_TRANSACTION_ID_SELLER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addTransaction = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_TRANSACTION,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get API
    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      url: `${process.env.REACT_APP_HOST}/transaction`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        //berhasil get API
        console.log(response);
        dispatch({
          type: ADD_TRANSACTION,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Melakukan Penawaran",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        //error get api

        dispatch({
          type: ADD_TRANSACTION,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        Swal.fire({
          icon: "error",
          title: "Gagal Melakukan Penawaran",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
};

export const updateTransactionSeller = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: UPDATE_TRANSACTION_SELLER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get API
    axios({
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      url: `${process.env.REACT_APP_HOST}/transaction/${data.transactionId}`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: UPDATE_TRANSACTION_SELLER,
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
          type: UPDATE_TRANSACTION_SELLER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
