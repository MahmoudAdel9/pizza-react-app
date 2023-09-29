import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  console.log(ingredients);

  return (
    <li>
      <div className="flex items-center justify-between gap-4  px-4 py-2">
        <p>
          <span className="font-semibold text-black">{quantity}&times;</span>{" "}
          {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="mb-2 px-4 font-medium text-stone-500">
        {isLoadingIngredients ? "Loading.. " : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
