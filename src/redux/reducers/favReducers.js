import { FAV_ADD_ITEM } from "../constants/favConstants";

export const favouriteReducer = (state = { favItems: [] }, action) => {
  switch (action.type) {
    case FAV_ADD_ITEM: {
      const item = action.payload;
      const existItem = state.favItems.find((x) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          favItems: state.favItems.map((x) =>
            x.id === existItem.id ? item : x
          ),
        };
      } else {
        return { ...state, favItems: [...state.favItems, item] };
      }
    }
    default:
      return state;
  }
};
