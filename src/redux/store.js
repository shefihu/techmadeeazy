import { data } from "autoprefixer";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
// import Cookies from "js-cookie";
import thunk from "redux-thunk";
import { currencyListReducer } from "./reducers/currencyreducer";
import { devListReducer } from "./reducers/devReducers";
// import { cartReducer } from "./reducers/cartReducers";
// import {
//   maleProductListReducer,
//   femaleProductListReducer,
//   childrenProductListReducer,
//   productDetailsReducer,
//   productListReducer,
//   randomProductListReducer,
// } from "./reducers/productReducers";
// import {
//   adminSigninReducer,
//   userRegisternReducer,
//   userSigninReducer,
// } from "./reducers/userReducer";
// import {
//   AdminOrderDetailsReducer,
//   AdminOrderReducer,
//   orderCreateReducer,
//   orderDetailsReducer,
//   UserOrderDetailsReducer,
// } from "./reducers/orderReducer";
// const initialState = {
//   cart: {
//     cartItems: Cookies.get("cartItems")
//       ? JSON.parse(Cookies.get("cartItems"))
//       : [],
//     shippingAddress: Cookies.get("shippingAddress")
//       ? JSON.parse(Cookies.get("shippingAddress"))
//       : {},
//     paymentMethod: "Cash",
//   },
//   userSignin: {
//     userInfo: Cookies.get("userInfo")
//       ? JSON.parse(Cookies.get("userInfo"))
//       : null,
//   },
//   adminSignin: {
//     adminInfo: Cookies.get("adminInfo")
//       ? JSON.parse(Cookies.get("adminInfo"))
//       : null,
//   },
// };
const reducer = combineReducers({
  devLists: devListReducer,
  currencyLists: currencyListReducer,
  //   userSignin: userSigninReducer,
  //   adminSignin: adminSigninReducer,
  //   userRegister: userRegisternReducer,
  //   productList: productListReducer,
  //   randomProductList: randomProductListReducer,
  //   maleProductList: maleProductListReducer,
  //   femaleProductList: femaleProductListReducer,
  //   childrenProductList: childrenProductListReducer,
  //   productDetails: productDetailsReducer,
  //   cart: cartReducer,
  //   orderCreate: orderCreateReducer,
  //   orderDetails: orderDetailsReducer,
  //   userOrderDetails: UserOrderDetailsReducer,
  //   adminOrderDetails: AdminOrderDetailsReducer,
  //   adminOrder: AdminOrderReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  //   initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
