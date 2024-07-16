import { API } from "../../constants/wordpress";
import { FlatList } from "react-native-gesture-handler";
import { RelatedProductsListSkeleton } from "./skeletons";
import { Text, View } from "react-native";
import lang from "../../lang/es";
import ProductCard from "./ProductCard";
import useRelatedProducts from "../../hooks/useRelatedProducts";

export default function RelatedProductsList({ productId, relatedIds }) {
  const {
    products: relatedProducts,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useRelatedProducts({
    perPage: API.PRODUCTS.RELATED_RESULTS_PER_PAGE,
    relatedIds,
    productId,
  });

  const handleFetchNextRelatedProductsPage = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  let content = null;

  if (isLoading) {
    content = <RelatedProductsListSkeleton />;
  } else if (isError) {
    content = <Text>{lang.noResults}</Text>;
  } else if (relatedProducts.length === 0) {
    content = <Text>{lang.noResults}</Text>;
  } else {
    content = (
      <FlatList
        horizontal
        style={{
          paddingBottom: 10,
        }}
        data={relatedProducts}
        renderItem={({ item }) => (
          <View key={item.id} className="w-44">
            <ProductCard product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleFetchNextRelatedProductsPage}
        onEndReachedThreshold={0.8}
        ListFooterComponent={
          hasNextPage ? <RelatedProductsListSkeleton /> : null
        }
      />
    );
  }

  return (
    <View className="space-y-1">
      <Text className="text-lg font-bold">{lang.relatedProducts}</Text>
      {content}
    </View>
  );
}
