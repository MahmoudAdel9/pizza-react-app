import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, gerCurrentQuantityById, getCart } from "../cart/cartSlice";
import DeleteButton from "../../ui/DeleteButton";
import UpdateItemQuantity from "../../ui/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl, quantity } =
    pizza;
  const dispatch = useDispatch();

  const currentQuantity = useSelector(gerCurrentQuantityById(id));

  const newItem = {
    pizzaId: id,
    name,
    quantity: 1,
    unitPrice,
    totalPrice: unitPrice * 1,
  };

  function handleAdd(newItem) {
    //LATER
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex  gap-4 py-3">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-bold tracking-wider">{name}</p>
        <p className="text-base capitalize text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm font-semibold ">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-bold uppercase text-stone-500 ">
              Sold out
            </p>
          )}
          <div className="space-x-2">
            {!soldOut && currentQuantity === 0 && (
              <Button type="small" onClick={() => handleAdd(newItem)}>
                Add To Cart
              </Button>
            )}
            {currentQuantity > 0 && (
              <div className="flex items-center gap-2 sm:gap-6 ">
                <UpdateItemQuantity
                  pizzaId={id}
                  currentQuantity={currentQuantity}
                />
                <DeleteButton pizzaIdd={id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
