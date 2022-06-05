import axios from "axios";
import {
  CURRENCY_LIST_FAILURE,
  CURRENCY_LIST_REQUEST,
  CURRENCY_LIST_SUCCESS,
} from "../constants/currencyconstants";

export const listofcurrency =
  (setCurrency, setnetCurrency) => async (dispatch) => {
    dispatch({
      type: CURRENCY_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get("https://api.terawork.com/resources");
      dispatch({ type: CURRENCY_LIST_SUCCESS, payload: data });

      setCurrency(data.data.currencies);
      setnetCurrency(data.data.net_conversions);
    } catch (error) {
      dispatch({ type: CURRENCY_LIST_FAILURE, payload: error.message });
    }
  };
