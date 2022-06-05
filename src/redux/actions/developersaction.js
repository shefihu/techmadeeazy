import axios from "axios";
import {
  DEV_LIST_FAILURE,
  DEV_LIST_REQUEST,
  DEV_LIST_SUCCESS,
} from "../constants/devConstants";

export const listofdev = (setDevs) => async (dispatch) => {
  dispatch({
    type: DEV_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(
      "https://api.terawork.com/service-categories/sellers-services/computer-software-development"
    );
    dispatch({ type: DEV_LIST_SUCCESS, payload: data });
    const _developers = data.data.service_search_results.hits;
    setDevs(_developers);
  } catch (error) {
    dispatch({ type: DEV_LIST_FAILURE, payload: error.message });
  }
};
export const favouritedev = () => async (dispatch) => {};
