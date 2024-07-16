import { LoadingScreenContext } from "../context/LoadingScreenContext";
import { useContext } from "react";

export default function useLoadingScreen() {
  return useContext(LoadingScreenContext);
}
