import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <Link to="/menu" className="font-bold text-sky-600 hover:text-sky-700">
        &larr; Back to menu
      </Link>

      <p className="mt-4 text-base font-semibold sm:text-xl">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
