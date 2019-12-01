import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";

const navigationItems = props => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link={"/"} exact>
      Burger builder
    </NavigationItem>
    <NavigationItem link={"/orders"}>Orders</NavigationItem>
  </ul>
);

export default navigationItems;
