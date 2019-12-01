import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utiity";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
const initialState = {
  ingredients: null,
  price: 4,
  error: false
};

const addIngredients = (state, action) => {
  const updateIngredient = {
    [action.typeIngredient]: state.ingredients[action.typeIngredient] + 1
  };
  const updateIngredinets = updateObject(state.ingredients, updateIngredient);
  const updateState = {
    ingredients: updateIngredinets,
    price: state.price + INGREDIENT_PRICES[action.typeIngredient]
  };
  return updateObject(state, updateState);
};

const removeIngredients = (state, action) => {
  const updateIng = {
    [action.typeIngredient]: state.ingredients[action.typeIngredient] - 1
  };
  const updateIngs = updateObject(state.ingredients, updateIng);
  const updateSt = {
    ingredients: updateIngs,
    price: state.price + INGREDIENT_PRICES[action.typeIngredient]
  };
  return updateObject(state, updateSt);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      meat: action.ingredients.meat,
      cheese: action.ingredients.cheese,
      bacon: action.ingredients.bacon
    },
    error: false,
    price: 4
  });
};

const fetchIngredients = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INREDIENTS:
      return addIngredients(state, action);
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredients(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredients(state, action);
    default:
      return state;
  }
};

export default reducer;
