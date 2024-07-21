import { API } from "../../constants/wordpress";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { memo } from "react";
import { router, useLocalSearchParams } from "expo-router";
import CategoriesScrollableMenuSkeleton from "./skeletons/CategoriesScrollableMenuSkeleton";
import useCategories from "../../hooks/useCategories";

function CategoriesScrollableMenu({ parentId, path }) {
  const params = useLocalSearchParams();
  const getParentId = () => {
    if (parentId) {
      return parentId;
    }
    return params.parentId;
  };

  const { isLoading, isError, categories } = useCategories({
    parentId: getParentId(),
    perPage: API.CATEGORIES.RESULTS_PER_PAGE,
    orderBy: "id",
  });

  const handlePress = (categoryId) => {
    const params = new URLSearchParams({ parentId: getParentId() });
    router.navigate(`${path}/${categoryId}?${params}`);
  };

  if (isLoading) {
    return <CategoriesScrollableMenuSkeleton />;
  }

  if (isError || categories?.length === 0) {
    return null;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex flex-row space-x-5 p-2 h-20 md:h-32">
        {categories?.map((category) => (
          <View key={category.id}>
            <TouchableOpacity
              onPress={() => handlePress(category.id)}
              className="flex flex-col space-y-1 items-center bg-gray-50 py-1 px-2 md:py-2 md:px-4 rounded-md shadow-sm shadow-black"
            >
              <View className="h-10 w-10 md:h-16 md:w-16 rounded-full">
                <Image
                  source={{ uri: category.imageUrl }}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </View>
              <Text className="text-center uppercase text-xs">
                {category.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default memo(CategoriesScrollableMenu);
