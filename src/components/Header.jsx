import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { useSelector } from "react-redux";
export default function Header() {
  const items = useSelector(state => state.cart.items)
  const {showCart} = useContext(UserProgressContext);

  const totalNumberOfItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="food" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalNumberOfItems})</Button>
      </nav>
    </header>
  );
}
