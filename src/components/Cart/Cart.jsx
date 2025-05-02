import { useContext } from "react";
import Modal from "../UI/Modal";
import { currencyFormatter } from "../../util/formatting";
import Button from "../UI/Button";
import UserProgressContext from "../../store/UserProgressContext";
import CartItem from "../CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

export default function Cart() {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cart.items);

  const { progress, hideCart, showCheckOut } = useContext(UserProgressContext);

  const cartTotal = cartItem.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCloseCart() {
    hideCart();
  }

  function handleOpenCheckout() {
    showCheckOut();
  }

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartItem.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onDecrease={() => dispatch(cartActions.removeItem(item.id))}
            onIncrease={() => dispatch(cartActions.addItem(item))}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartItem.length > 0 && (
          <Button onClick={handleOpenCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
