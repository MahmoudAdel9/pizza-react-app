import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { cleareAll, getCart, getUsername } from "./cartSlice";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUsername);
  const dispatch = useDispatch();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <Link to="/menu" className="font-bold text-sky-600 hover:text-sky-700">
        &larr; Back to menu
      </Link>

      <h2 className="mt-8 text-2xl font-bold">Your cart, {username}</h2>

      <ul className="my-4 divide-y divide-slate-900/70 border-b border-slate-900/70">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button color="danger" onClick={() => dispatch(cleareAll())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
