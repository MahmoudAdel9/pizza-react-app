import { useState } from "react";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { cleareAll, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const {
    username,
    status: adressStatus,
    position,
    address,
    error,
  } = useSelector((store) => store.user);
  const isAdressLoading = adressStatus === "loading";

  const cartPrice = useSelector(getTotalPrice);
  const priority = withPriority ? (cartPrice * 20) / 100 : 0;
  const totalPrice = cartPrice + priority;

  const formErrors = useActionData();

  if (cart.length <= 0) return <EmptyCart />;

  return (
    <div className=" p-4  text-sm sm:text-lg">
      <h2 className="my-6 text-base font-semibold sm:text-2xl">
        {"Ready to order? Let's go!"}
      </h2>

      <Form method="POST" className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className=" sm:basis-44">First Name</label>
          <input
            className="input flex-1"
            type="text"
            name="customer"
            required
            placeholder="First Name"
            defaultValue={username}
          />
        </div>

        <div className="space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-44">Phone Number</label>
            <div className="flex-1">
              <input
                className="input w-full"
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
              />
            </div>
          </div>
          {formErrors?.phone && (
            <div className="flex sm:justify-end ">
              <p className=" rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 sm:text-xl">
                {formErrors.phone}
              </p>
            </div>
          )}
        </div>
        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-44">Address</label>
            <div className="relative flex-1">
              <input
                type="text"
                name="address"
                required
                className="input w-full"
                placeholder="Addresss"
                disabled={isAdressLoading}
                defaultValue={address}
              />
              {!position.latitude && !position.longitude && (
                <span className="absolute right-0  h-full ">
                  <Button
                    disabled={isAdressLoading}
                    type="position"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(fetchAddress());
                    }}
                  >
                    Get Your Position
                  </Button>
                </span>
              )}
            </div>
          </div>
          {adressStatus === "error" && (
            <div className=" mt-2 flex sm:justify-end">
              <p className=" rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 sm:text-xl">
                {error}
              </p>
            </div>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="mb-4 mr-4 h-5 w-5 accent-amber-400 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isAdressLoading}>
            {isSubmitting
              ? "Order Is Loading.."
              : `Order now (${formatCurrency(totalPrice)})`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = "Please Enter A Valid Phone Number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(cleareAll());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
