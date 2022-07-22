import axios from "axios";

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
    //loading
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
        //berhasil get API
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
        //error get api
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
    //loading
    dispatch({
      type: GET_PRODUCT_ID,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_HOST}/product/` + id,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
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
        //error get api
        console.log(error.response.data);
        if (error.response.data.message === "Data not found") {
          window.location.href = "/404";
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
        //error get api
        console.log(error.response.status);
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
    //loading
    dispatch({
      type: GET_PRODUCT_ID_SELLER,
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
      url: `${process.env.REACT_APP_HOST}/product/seller/` + id,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        console.log(response);
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
        console.log(error.response.data);
        if (error.response.data.message === "Data not found") {
          window.location.href = "/404";
        }

        //error get api
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

    console.log("INI DI ACTION : ", data);
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
        //berhasil get API
        console.log("3. Berhasil Dapat Data", response.data);
        if (response.data.data.status === "draft") {
          window.location.href = "/seller-product/" + response.data.data.id;
        } else {
          window.location.href = "/seller";
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
        console.log("3. Gagal Dapat Data", error.response);
        //error get api
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

    console.log("INI DI ACTION : ", data);
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
        //berhasil get API
        console.log("3. Berhasil Dapat Data", response.data);
        if (data.status === "draft") {
          window.location.href = "/seller-product/" + data.id;
        } else {
          window.location.href = "/seller";
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
        // console.log("3. Gagal Dapat Data", error.response.data);
        //error get api
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

// export const updateProduct1 = (data) => async (dispatch) => {
//   try {
//     console.log(data);
//     //loading
//     dispatch({
//       type: UPDATE_PRODUCT,
//       payload: {
//         loading: true,
//         data: false,
//         errorMessage: false,
//       },
//     });
//     //get API
//     var formdata = new FormData();
//     formdata.append("name", data.name);
//     formdata.append("price", data.price);
//     formdata.append("categoryId", data.categoryId);
//     formdata.append("description", data.description);
//     formdata.append("oldImage", data.oldImage);

//     if (data.image.length > 0) {
//       if (
//         data.image[0].type === "image/jpeg" ||
//         data.image[0].type === "image/png"
//       ) {
//         formdata.append("image", data.image[0]);
//       } else if (data.image[0] !== "") {
//         formdata.append("image", data.image[0]);
//       }
//       if (
//         data.image[1].type === "image/jpeg" ||
//         data.image[1].type === "image/png"
//       ) {
//         formdata.append("image", data.image[1]);
//       } else if (data.image[1] !== "") {
//         formdata.append("image", data.image[1]);
//       }
//       if (
//         data.image[2].type === "image/jpeg" ||
//         data.image[2].type === "image/png"
//       ) {
//         formdata.append("image", data.image[2]);
//       } else if (data.image[2] !== "") {
//         formdata.append("image", data.image[2]);
//       }
//       if (
//         data.image[3].type === "image/jpeg" ||
//         data.image[3].type === "image/png"
//       ) {
//         formdata.append("image", data.image[3]);
//       } else if (data.image[3] !== "") {
//         formdata.append("image", data.image[3]);
//       }
//     }

//     fetch(`${process.env.REACT_APP_HOST}/product/` + data.id, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//       timeout: 120000,
//       body: formdata,
//     }).then((response) => {
//       //berhasil get API
//       console.log(response);
//       if (response.data.product.status === "draft") {
//         window.location.href = "/seller-product/" + response.data.product.id;
//       } else {
//         window.location.href = "/seller";
//       }
//       dispatch({
//         type: UPDATE_PRODUCT,
//         payload: {
//           loading: false,
//           data: response.data,
//           errorMessage: false,
//         },
//       });
//     });
//   } catch (error) {
//     //error get api
//     dispatch({
//       type: UPDATE_PRODUCT,
//       payload: {
//         loading: false,
//         data: false,
//         errorMessage: error.message,
//       },
//     });
//   }
// };

export const deleteProduct = (id) => {
  console.log("2. Masuk ke action");
  return (dispatch) => {
    dispatch({
      type: DELETE_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get API
    axios({
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      url: `${process.env.REACT_APP_HOST}/product/` + id,
      timeout: 120000,
    })
      .then((response) => {
        window.location.href = "/seller";
        console.log("3. Berhasil dapet data:", response);
        //berhasil get api
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
        console.log("3. Gagal dapet data : ", error);
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
