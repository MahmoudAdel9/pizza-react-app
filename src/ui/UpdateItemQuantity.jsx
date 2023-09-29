import { useDispatch } from "react-redux";
import Button from "./Button";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../features/cart/cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="space-x-2">
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
      <span className="text-base font-bold">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
