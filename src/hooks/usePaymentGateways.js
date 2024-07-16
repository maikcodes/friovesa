import { Checkout } from "../services/Checkout";
import { useQuery } from "@tanstack/react-query";

export function usePaymentGateways() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["paymentGateways"],
    queryFn: async () => await Checkout.getPaymentGateways(),
  });

  return {
    isLoading,
    isError,
    paymentGateway: data,
  };
}
