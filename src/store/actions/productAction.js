import axios from "axios";
import { handleSwal } from "utils/sweetAlert";

import {
  GET_LIST_PRODUCT,
  GET_PRODUCT_ID,
  GET_LIST_PRODUCT_SELLER,
  GET_PRODUCT_ID_SELLER,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  LOGOUT,
} from "store/types";

export const getListProduct = () => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_HOST}/product`,
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: GET_LIST_PRODUCT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_LIST_PRODUCT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getProductId = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_PRODUCT_ID,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_HOST}/product/` + id,
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: GET_PRODUCT_ID,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        if (error.response.data.message === "Data not found") {
          window.location = "/404";
        }
        dispatch({
          type: GET_PRODUCT_ID,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getListProductSeller = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_LIST_PRODUCT_SELLER,
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
      url: `${process.env.REACT_APP_HOST}/product/seller`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_LIST_PRODUCT_SELLER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_LIST_PRODUCT_SELLER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
        if (error.response.status === 401) {
          dispatch({
            type: LOGOUT,
          }).then((window.location.href = "/login"));
        }
      });
  };
};

export const getProductIdSeller = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_PRODUCT_ID_SELLER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      url: `${process.env.REACT_APP_HOST}/product/seller/` + id,
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: GET_PRODUCT_ID_SELLER,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        if (error.response.data.message === "Data not found") {
          window.location = "/404";
        }

        dispatch({
          type: GET_PRODUCT_ID_SELLER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addProduct = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    var formdata = new FormData();
    formdata.append("userId", data.userId);
    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("categoryId", data.categoryId);
    formdata.append("description", data.description);
    formdata.append("status", data.status);

    if (data.image.length > 0) {
      if (
        data.image[0].type === "image/jpeg" ||
        data.image[0].type === "image/png"
      ) {
        formdata.append("image", data.image[0]);
      }
      if (
        data.image[1].type === "image/jpeg" ||
        data.image[1].type === "image/png"
      ) {
        formdata.append("image", data.image[1]);
      }
      if (
        data.image[2].type === "image/jpeg" ||
        data.image[2].type === "image/png"
      ) {
        formdata.append("image", data.image[2]);
      }
      if (
        data.image[3].type === "image/jpeg" ||
        data.image[3].type === "image/png"
      ) {
        formdata.append("image", data.image[3]);
      }
    }

    //get API
    axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      url: `${process.env.REACT_APP_HOST}/product`,
      timeout: 120000,
      data: formdata,
    })
      .then((response) => {
        if (response.data.data.status === "draft") {
          handleSwal("Loading Preview...", "success").then(function () {
            window.location = "/seller-product/" + response.data.data.id;
          });
        } else {
          handleSwal("Data Berhasil di tambahkan!", "success").then(
            function () {
              window.location = "/seller";
            }
          );
        }

        dispatch({
          type: ADD_PRODUCT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: ADD_PRODUCT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const updateProduct = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    var formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("categoryId", data.categoryId);
    formdata.append("description", data.description);
    formdata.append("oldImage", data.oldImage);
    formdata.append("status", data.status);

    if (data.image[0]) {
      if (data.image[0] !== "") {
        formdata.append("image", data.image[0]);
      } else if (
        data.image[0].type === "image/jpeg" ||
        data.image[0].type === "image/png"
      ) {
        formdata.append("image", data.image[0]);
      }
    }

    if (data.image[1]) {
      if (data.image[1] !== "") {
        formdata.append("image", data.image[1]);
      } else if (
        data.image[1].type === "image/jpeg" ||
        data.image[1].type === "image/png"
      ) {
        formdata.append("image", data.image[1]);
      }
    }

    if (data.image[2]) {
      if (data.image[2] !== "") {
        formdata.append("image", data.image[2]);
      } else if (
        data.image[2].type === "image/jpeg" ||
        data.image[2].type === "image/png"
      ) {
        formdata.append("image", data.image[2]);
      }
    }
    if (data.image[3]) {
      if (data.image[3] !== "") {
        formdata.append("image", data.image[3]);
      } else if (
        data.image[3].type === "image/jpeg" ||
        data.image[3].type === "image/png"
      ) {
        formdata.append("image", data.image[3]);
      }
    }

    //get API
    axios({
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      url: `${process.env.REACT_APP_HOST}/product/` + data.id,
      timeout: 120000,
      data: formdata,
    })
      .then((response) => {
        if (data.status === "draft") {
          handleSwal("Loading Preview...", "success").then(function () {
            window.location = "/seller-product/" + data.id;
          });
        } else {
          handleSwal("Data Berhasil di Terbitkan!", "success").then(
            function () {
              window.location = "/seller";
            }
          );
        }
        dispatch({
          type: UPDATE_PRODUCT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_PRODUCT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      url: `${process.env.REACT_APP_HOST}/product/` + id,
      timeout: 120000,
    })
      .then((response) => {
        handleSwal("Data Berhasil di Hapus!", "success").then(function () {
          window.location = "/seller";
        });
        dispatch({
          type: DELETE_PRODUCT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: DELETE_PRODUCT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
