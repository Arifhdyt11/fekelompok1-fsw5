import axios from "axios";
import Swal from "sweetalert2";

import {
  GET_LIST_TRANSACTION_BUYER,
  GET_LIST_TRANSACTION_SELLER,
  GET_TRANSACTION_ID_SELLER,
  UPDATE_TRANSACTION_SELLER,
  ADD_TRANSACTION,
} from "store/types";
import { handleSwal } from "utils/sweetAlert";

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
        handleSwal("Berhasil Melakukan Penawaran!", "success");
        dispatch({
          type: ADD_TRANSACTION,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //error get api

        handleSwal("Gagal Melakukan Penawaran!", "error");
        dispatch({
          type: ADD_TRANSACTION,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
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
        handleSwal(
          data.status === "success"
            ? "Transaksi Berhasil"
            : data.status === "process"
            ? "Transaksi Dalam Proses"
            : data.status === "cancel" || data.status === "reject"
            ? "Transaksi Dibatalkan"
            : "",
          "success"
        );
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
