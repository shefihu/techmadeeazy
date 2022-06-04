import {
  DEV_LIST_FAILURE,
  DEV_LIST_REQUEST,
  DEV_LIST_SUCCESS,
} from "../constants/devConstants";

export const devListReducer = (
  state = { loading: true, developers: [] },
  action
) => {
  switch (action.type) {
    case DEV_LIST_REQUEST:
      return { loading: true };
    case DEV_LIST_SUCCESS:
      return { loading: false, developers: action.payload };
    case DEV_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
