import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import Cookies from "js-cookie";
import thunk from "redux-thunk";
import { currencyListReducer } from "./reducers/currencyreducer";
import { devListReducer } from "./reducers/devReducers";
import { favouriteReducer } from "./reducers/favReducers";

const initialstate = {
  favLists: {
    favItems: Cookies.get("favourites")
      ? JSON.parse(Cookies.get("favourites"))
      : [],
  },
};
const reducer = combineReducers({
  devLists: devListReducer,
  currencyLists: currencyListReducer,
  favLists: favouriteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialstate,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
