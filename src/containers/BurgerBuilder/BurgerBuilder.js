import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props)
  //   this.state: {
  //   }
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    price: 4,
    perchasable: false,
    perchasing: false
  };

  updatePerchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ perchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.price + priceAddition;
    this.setState({ price: newPrice, ingredients: updateIngredients });
    this.updatePerchaseState(updateIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updateCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = this.state.price - priceDeduction;
    this.setState({ price: newPrice, ingredients: updateIngredients });
    this.updatePerchaseState(updateIngredients);
  };
  perchaseHandler = () => {
    this.setState({ perchasing: true });
  };
  perchaseCancelHandler = () => {
    this.setState({ perchasing: false });
  };
  perchaseContinueHandler = () => {
    alert("You continue!");
  };
  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.perchasing} modalClosed={this.perchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            perchaseCanceled={this.perchaseCancelHandler}
            perchaseContinued={this.perchaseContinueHandler}
          />
        </Modal>
        <Burger ingridients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.price}
          perchasable={this.state.perchasable}
          ordered={this.perchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
