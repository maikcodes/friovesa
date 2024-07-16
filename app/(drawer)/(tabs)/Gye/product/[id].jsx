import { useLocalSearchParams } from "expo-router";
import ProductDetailsScreen from "../../../../../src/screens/City/ProductDetailsScreen";

export default function Product() {
  const product = useLocalSearchParams();

  return <ProductDetailsScreen productData={product} />;
}
