import axios from "axios";

import {
  GET_LIST_PRODUCT,
  GET_PRODUCT_ID,
  GET_LIST_PRODUCT_SELLER,
  GET_PRODUCT_ID_SELLER,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
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

export const getListProductSeller = (token) => {
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
      headers: { Authorization: `Bearer ${token}` },
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
        dispatch({
          type: GET_LIST_PRODUCT_SELLER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getProductIdSeller = (id, token) => {
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
      headers: { Authorization: `Bearer ${token}` },
      url: `${process.env.REACT_APP_HOST}/product/seller/` + id,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
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

// export const addProduct = (data) => {
//   var formdata = new FormData();
//   formdata.append("name", data.name);
//   formdata.append("price", data.price);
//   formdata.append("categoryId", data.categoryId);
//   formdata.append("description", data.description);
//   formdata.append("image", data.image);

//   return (dispatch) => {
//     //loading
//     dispatch({
//       type: ADD_PRODUCT,
//       payload: {
//         loading: true,
//         data: false,
//         errorMessage: false,
//       },
//     });

//     axios.interceptors.request.use(
//       (config) => {
//         config.headers.authorization = `Bearer ${data.accessToken}`;
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     //get API
//     axios({
//       method: "POST",
//       url: `${process.env.REACT_APP_HOST}/product`,
//       body: formdata,
//       timeout: 120000,
//       data: data,
//     })
//       .then((response) => {
//         //berhasil get API
//         dispatch({
//           type: ADD_PRODUCT,
//           payload: {
//             loading: false,
//             data: response.data,
//             errorMessage: false,
//           },
//         });
//       })
//       .catch((error) => {
//         //error get api
//         dispatch({
//           type: ADD_PRODUCT,
//           payload: {
//             loading: false,
//             data: false,
//             errorMessage: error.message,
//           },
//         });
//       });
//   };
// };

export const addProduct = (data) => async (dispatch) => {
  try {
    console.log("INI DI ACTION : ", data);
    var formdata = new FormData();
    formdata.append("userId", data.userId);
    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("categoryId", data.categoryId);
    formdata.append("description", data.description);

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

    console.log("DI ACTION 2 :", data);
    const response = await fetch(`${process.env.REACT_APP_HOST}/product`, {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const result = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT,
      payload: error.response,
    });
  }
};

export const updateProduct = (data) => async (dispatch) => {
  try {
    console.log(data);
    //loading
    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    //get API
    var formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("categoryId", data.categoryId);
    formdata.append("description", data.description);
    formdata.append("oldImage", data.oldImage);
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
    fetch(`${process.env.REACT_APP_HOST}/product/` + data.id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      timeout: 120000,
      body: formdata,
    }).then((response) => {
      //berhasil get API
      dispatch({
        type: UPDATE_PRODUCT,
        payload: {
          loading: false,
          data: response.data,
          errorMessage: false,
        },
      });
    });
  } catch (error) {
    //error get api
    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        loading: false,
        data: false,
        errorMessage: error.message,
      },
    });
  }
};

export const deleteProduct = (id, token) => {
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
    console.log(token);
    //get API
    axios({
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      url: `${process.env.REACT_APP_HOST}/product/` + id,
      timeout: 120000,
    })
      .then((response) => {
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
