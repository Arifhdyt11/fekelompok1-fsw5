import axios from "axios";
import {
  GET_LIST_SIZE,
  ADD_SIZE,
  DELETE_SIZE,
  UPDATE_SIZE,
  DETAIL_SIZE,
} from "store/types";

export const getListSize = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_LIST_SIZE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_HOST}/size`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_LIST_SIZE,
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
          type: GET_LIST_SIZE,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addSize = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_SIZE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_HOST}/size`,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        //berhasil get API
        console.log("3. Berhasil Dapat Data", response.data);
        dispatch({
          type: ADD_SIZE,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. Gagal Dapat Data", error.response.data);
        //error get api
        dispatch({
          type: ADD_SIZE,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

//update
export const detailSize = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: DETAIL_SIZE,
      payload: {
        data: data,
      },
    });
  };
};

export const updateSize = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: UPDATE_SIZE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_HOST}/size/` + data.id,
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: UPDATE_SIZE,
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
          type: UPDATE_SIZE,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const deleteSize = (id) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: DELETE_SIZE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_HOST}/size/` + id,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: DELETE_SIZE,
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
          type: DELETE_SIZE,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
