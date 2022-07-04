import axios from "axios";
import Swal from "sweetalert2";

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

export const addProduct = (params) => async (dispatch) => {
  try {
    var formdata = new FormData();
    formdata.append("userId", localStorage.getItem(`user.id`));
    formdata.append("name", params.name);
    formdata.append("price", params.price);
    formdata.append("categoryId", params.catagoryId);
    formdata.append("description", params.description);

    if (params.image.length > 0) {
      if (
        (params.image[0].type === "image/jpeg",
        params.image[0].type === "image/png")
      ) {
        formdata.append("image", params.image[0]);
      }
      if (
        (params.image[1].type === "image/jpeg",
        params.image[1].type === "image/png")
      ) {
        formdata.append("image", params.image[1]);
      }
      if (
        (params.image[2].type === "image/jpeg",
        params.image[2].type === "image/png")
      ) {
        formdata.append("image", params.image[2]);
      }
      if (
        (params.image[3].type === "image/jpeg",
        params.image[3].type === "image/png")
      ) {
        formdata.append("image", params.image[3]);
      }
    }

    const response = await fetch(`http://localhost:9000/api/v1/product`, {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const result = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      payload: result.params,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT,
      payload: error.response,
    });

    Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
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

    //get API
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_HOST}/product/` + data.id,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        //berhasil get API
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
