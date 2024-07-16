import { View, FlatList } from "react-native";
import CategoriesListSkeleton from "./skeletons/CategoriesListSkeleton";
import CategoryCard from "./CategoryCard";

export default function CategoriesList({
  handlePress,
  categories,
  hasMore,
  handleFetchNextPage,
}) {
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <View className="w-1/3">
          <CategoryCard
            category={item}
            handlePress={() => handlePress(item.id)}
          />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={hasMore ? handleFetchNextPage : null}
      onEndReachedThreshold={0.5}
      numColumns={3}
      ListFooterComponent={hasMore ? <CategoriesListSkeleton /> : null}
    />
  );
}
