// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-6 px-4 py-8 text-lg">
      <div className=" flex flex-wrap items-center justify-center gap-4 sm:justify-between">
        <h2 className="mb-2 text-2xl font-bold tracking-wider sm:mb-0">
          Order <span className="text-yellow-500">#{id}</span> Status
        </h2>

        <div className="space-x-2 rounded-full bg-green-500 px-6 py-1.5 font-semibold tracking-wide text-white">
          {priority && <span className="font-bold">{"(Priority)"}</span>}
          <span className="capitalize">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 bg-stone-200 p-4">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 text-base">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.load === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className=" bg-stone-200 p-4">
        <p className="text-base text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
