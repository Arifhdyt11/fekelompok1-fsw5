import axios from "axios";
import { GET_LIST_CATEGORY } from "store/types";

export const getListCategory = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_LIST_CATEGORY,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_HOST}/category`,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_LIST_CATEGORY,
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
          type: GET_LIST_CATEGORY,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};
