import { CheckoutContext } from "../context/CheckoutContext";
import { useContext } from "react";

export default function useCheckout() {
  return useContext(CheckoutContext);
}
