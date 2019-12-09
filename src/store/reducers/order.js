import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const perchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const perchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const perchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });

  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  });
};

const perchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const fetchOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchOrderSuccess = (state, action) => {
  return updateObject(state, { orders: action.order, loading: false });
};
const fetchOrderFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return perchaseInit(state, action);
    case actionTypes.PERCHASE_BURGER_START:
      return perchaseBurgerStart(state, action);
    case actionTypes.PERCHASE_BURGER_SUCCESS:
      return perchaseBurgerSuccess(state, action);
    case actionTypes.PERCHASE_BURGER_FAIL:
      return perchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDER_START:
      return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDER_FAIL:
      return fetchOrderFail(state, action);
    default:
      return state;
  }
};

export default reducer;
