import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPizzaNum, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const pizzasNum = useSelector(getTotalPizzaNum);
  const totalPrice = useSelector(getTotalPrice);

  if (pizzasNum === 0) return null;

  return (
    <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-base text-stone-100 sm:text-lg">
      <p className="space-x-4">
        <span>
          {pizzasNum} {pizzasNum > 1 ? "pizzas" : "pizza"}
        </span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart" className=" font-semibold">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
