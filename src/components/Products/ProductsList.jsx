import { View, FlatList } from "react-native";
import ProductCard from "./ProductCard";
import ProductsListSkeleton from "./skeletons/ProductsListSkeleton";

export default function ProductsList({
  products,
  handleFetchNextPage,
  hasMore,
}) {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <View className="w-1/2">
          <ProductCard product={item} />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={hasMore ? handleFetchNextPage : null}
      onEndReachedThreshold={0.95}
      numColumns={2}
      ListFooterComponent={hasMore ? <ProductsListSkeleton /> : null}
    />
  );
}
