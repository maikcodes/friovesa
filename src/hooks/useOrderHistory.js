import { OrderHistoryContext } from "../context/OrderHistoryContext";
import { useContext } from "react";

export default function useOderHistory() {
  return useContext(OrderHistoryContext);
}
