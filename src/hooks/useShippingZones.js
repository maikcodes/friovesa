import { Checkout } from "../services/Checkout";
import { useQuery } from "@tanstack/react-query";

export function useShippingZones() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["shippingZones"],
    queryFn: async () => await Checkout.getShippingZones(),
  });

  return {
    isLoading,
    isError,
    shippingZones: data,
  };
}
