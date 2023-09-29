import { useDispatch } from "react-redux";
import { deleteItem } from "../features/cart/cartSlice";
import Button from "./Button";

function DeleteButton({ pizzaIdd }) {
  const dispatch = useDispatch();

  return (
    <Button
      type="small"
      color="danger"
      onClick={() => dispatch(deleteItem(pizzaIdd))}
    >
      Delete
    </Button>
  );
}

export default DeleteButton;
