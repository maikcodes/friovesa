import { Checkout } from "../services/Checkout";
import { useState } from "react";

export default function useOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const createOrder = async ({
    shippingZone,
    paymentMethod,
    address,
    cart,
    customerId,
  }) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await Checkout.createOrder({
        shippingZone,
        paymentMethod,
        address,
        cart,
        customerId,
      });
      setCreatedOrder(response);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, isLoading, isError, createdOrder };
}
