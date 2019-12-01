import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

const checkoutSummary = props => (
  <div className={styles.CheckoutSummary}>
    <h1>We hope it tastes well</h1>
    <div style={{ width: "100%", margin: "auto" }}>
      <Burger ingridients={props.ingredients} />
    </div>
    <Button clicked={props.checkoutCancelled} btnType="Danger">
      CANCEL
    </Button>
    <Button clicked={props.checkoutContinued} btnType="Success">
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummary;
