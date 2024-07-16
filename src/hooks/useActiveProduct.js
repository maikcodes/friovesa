import { ActiveProductContext } from "../context/ActiveProductContext";
import { useContext } from "react";

export default function useActiveProduct() {
  return useContext(ActiveProductContext);
}
