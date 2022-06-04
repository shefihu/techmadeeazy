import {
  CURRENCY_LIST_FAILURE,
  CURRENCY_LIST_REQUEST,
  CURRENCY_LIST_SUCCESS,
} from "../constants/currencyconstants";

export const currencyListReducer = (
  state = { loading2: true, currency: [] },
  action
) => {
  switch (action.type) {
    case CURRENCY_LIST_REQUEST:
      return { loading2: true };
    case CURRENCY_LIST_SUCCESS:
      return { loading2: false, currency: action.payload };
    case CURRENCY_LIST_FAILURE:
      return { loading2: false, error2: action.payload };
    default:
      return state;
  }
};
