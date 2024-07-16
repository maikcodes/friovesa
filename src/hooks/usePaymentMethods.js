import { Checkout } from "../services/Checkout";

export function usePaymentMethods() {
  const paymentMethods = Checkout.getPaymentMethods();
  
  return {
    paymentMethods,
  };
}
