import Cookies from "js-cookie";
import { FAV_ADD_ITEM } from "../constants/favConstants";
export const addToFav =
  (_id, display_name, service_photo, avatar, starting_from) =>
  async (dispatch, getState) => {
    dispatch({
      type: FAV_ADD_ITEM,
      payload: {
        id: _id,
        name: display_name,
        photo: service_photo,
        avatar: avatar,
        starting: starting_from,
      },
    });
    Cookies.set("favourites", JSON.stringify(getState().favLists.favItems));
  };
