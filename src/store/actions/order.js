import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";

export const perchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PERCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};
export const perchaseBurgerFail = error => {
  return {
    type: actionTypes.PERCHASE_BURGER_FAIL,
    error: error
  };
};

export const perchaseBurgerStart = () => {
  return {
    type: actionTypes.PERCHASE_BURGER_START
  };
};
export const perchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const perchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(perchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(response => {
        console.log(response.data);
        dispatch(perchaseBurgerSuccess(response.name, orderData));
      })
      .catch(error => {
        dispatch(perchaseBurgerFail(error));
      });
  };
};

export const fetchOrderSuccess = order => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    order: order
  };
};

export const fetchOrderFail = error => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: error
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("https://burgerbuilder-8cf79.firebaseio.com/orders.json" + queryParams)
      .then(res => {
        const fetchedData = [];
        for (let key in res.data) {
          fetchedData.push({
            ...res.data[key],
            id: key
          });
        }

        dispatch(fetchOrderSuccess(fetchedData));
      })
      .catch(err => {
        dispatch(fetchOrderFail(err));
      });
  };
};
