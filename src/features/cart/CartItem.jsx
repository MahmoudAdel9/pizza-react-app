import { useSelector } from "react-redux";
import DeleteButton from "../../ui/DeleteButton";
import UpdateItemQuantity from "../../ui/UpdateItemQuantity";
import { formatCurrency } from "../../utils/helpers";
import { gerCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity = 1, ingredients, totalPrice } = item;

  const currentQuantity = useSelector(gerCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p>
        <span className="font-semibold text-black">{quantity}&times;</span>{" "}
        {name}
      </p>
      <div className="flex items-center justify-between gap-x-6">
        <p className="font-bold sm:text-base">{formatCurrency(totalPrice)}</p>
        <div className="flex space-x-4">
          <UpdateItemQuantity
            pizzaId={pizzaId}
            currentQuantity={currentQuantity}
          />
          <DeleteButton pizzaIdd={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
