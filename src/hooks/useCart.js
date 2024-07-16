import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function useCart() {
  return useContext(CartContext);
}
