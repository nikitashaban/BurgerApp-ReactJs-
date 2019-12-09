import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

export class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props)
  //   this.state: {
  //   }
  // }
  state = {
    perchasing: false
  };

  componentDidMount() {
    // axios.get("/ingredients.json").then(response => {
    //   this.setState({ ingredients: response.data });
    // });
    this.props.onInitIgredients();
  }
  updatePerchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  perchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ perchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };
  perchaseCancelHandler = () => {
    this.setState({ perchasing: false });
  };
  perchaseContinueHandler = () => {
    this.props.onInitPerchase();
    this.props.history.push({
      pathname: "/checkout"
    });
  };
  render() {
    const disableInfo = {
      ...this.props.ing
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? <Spinner /> : null;

    if (this.props.ing) {
      burger = (
        <Aux>
          <Burger ingridients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredients}
            ingredientRemoved={this.props.onRemoveIngredients}
            disabled={disableInfo}
            price={this.props.price}
            perchasable={this.updatePerchaseState(this.props.ing)}
            ordered={this.perchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          ingredients={this.props.ing}
          perchaseCanceled={this.perchaseCancelHandler}
          perchaseContinued={this.perchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.perchasing} modalClosed={this.perchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: ingName => dispatch(actions.addIngredient(ingName)),
    onRemoveIngredients: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIgredients: () => dispatch(actions.initIngredients()),
    onInitPerchase: () => dispatch(actions.perchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
