import { useContext, useActionState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "../componetns/UI/Error";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { clearCart } = cartActions;
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const { progress, hideCheckOut } = useContext(UserProgressContext);

  const { sendRequest, error, data, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function handleHideCheckout() {
    hideCheckOut();
  }

  function handleFinish() {
    hideCheckOut();
    dispatch(clearCart());
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const custormerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: custormerData,
        },
      })
    );
  }

  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null
  );

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleHideCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleHideCheckout}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details in a few minutes</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleHideCheckout}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message="NOT FOUND" />}

        <p className="modal-actions">{actions}</p>
        {formState && null}
      </form>
    </Modal>
  );
}
