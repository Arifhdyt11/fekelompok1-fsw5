import axios from "axios";
import {
  WISHLIST_SELLER,
  WISHLIST_BUYER,
  ADD_WISHLIST_BUYER,
  DELETE_WISHLIST_BUYER,
} from "store/types";

export const getListWishlistSeller = (sellerId, token) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: WISHLIST_SELLER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get API
    axios({
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      url: `${process.env.REACT_APP_HOST}/wishlist/seller/` + sellerId,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: WISHLIST_SELLER,
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
          type: WISHLIST_SELLER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getListWishlistBuyer = (buyerId, token) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: WISHLIST_BUYER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get API
    axios({
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      url: `${process.env.REACT_APP_HOST}/wishlist/buyer/` + buyerId,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: WISHLIST_BUYER,
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
          type: WISHLIST_BUYER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addWishlist = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_WISHLIST_BUYER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "POST",
      headers: { Authorization: `Bearer ${data.accessToken}` },
      url: `${process.env.REACT_APP_HOST}/wishlist`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: ADD_WISHLIST_BUYER,
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
          type: ADD_WISHLIST_BUYER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const deleteWishlist = (id, token) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_WISHLIST_BUYER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    console.log(token);
    //get API
    axios({
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      url: `${process.env.REACT_APP_HOST}/wishlist/` + id,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get api
        dispatch({
          type: DELETE_WISHLIST_BUYER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: DELETE_WISHLIST_BUYER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
