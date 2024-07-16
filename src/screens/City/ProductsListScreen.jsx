import { API } from "../../constants/wordpress";
import { APP_COLORS } from "../../constants/colors";
import {
  CategoriesScrollableMenu,
  SubCategoriesScrollableMenuSkeleton,
} from "../../components/Categories";
import {
  CustomSafeAreaView,
  ErrorResults,
  ListContainer,
  NoResults,
} from "../../components";
import { FlatList, RefreshControl, View } from "react-native";
import { ProductCard, ProductsListSkeleton } from "../../components/Products";
import { useLocalSearchParams, usePathname } from "expo-router";
import { useState } from "react";
import lang from "../../lang/es";
import useProducts from "../../hooks/useProducts";

export default function ProductsListScreen({ categoryId, parentId }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isLoading, isError, products, refetch, fetchNextPage, hasNextPage } =
    useProducts({
      category: categoryId,
      perPage: API.PRODUCTS.RESULTS_PER_PAGE,
      orderBy: "include",
    });
  const pathname = usePathname();
  const { goBack } = useLocalSearchParams();

  const getProductsCityPath = () => {
    const pathArray = pathname.split("/");

    if (goBack) {
      return [pathArray[1], "subcategory"].join("/");
    }

    return pathArray.slice(0, 3).join("/");
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading || isRefreshing) {
    return (
      <CustomSafeAreaView>
        <View>
          <SubCategoriesScrollableMenuSkeleton />
        </View>

        <ProductsListSkeleton />
      </CustomSafeAreaView>
    );
  }

  if (isError) {
    return (
      <CustomSafeAreaView>
        <View>
          <CategoriesScrollableMenu
            parentId={parentId}
            path={getProductsCityPath()}
          />
        </View>

        <View className="pt-48">
          <ErrorResults infoMessage={lang.errorLoadingProducts} />
        </View>
      </CustomSafeAreaView>
    );
  }

  if (products?.length === 0) {
    return (
      <CustomSafeAreaView>
        <View>
          <CategoriesScrollableMenu
            parentId={parentId}
            path={getProductsCityPath()}
          />
        </View>

        <View className="pt-48">
          <NoResults />
        </View>
      </CustomSafeAreaView>
    );
  }

  return (
    <CustomSafeAreaView>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View className="w-1/2">
            <ProductCard product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={hasNextPage ? fetchNextPage : null}
        onEndReachedThreshold={0.95}
        numColumns={2}
        ListHeaderComponent={
          <CategoriesScrollableMenu
            parentId={parentId}
            path={getProductsCityPath()}
          />
        }
        ListFooterComponent={
          <ListContainer>
            {hasNextPage ? <ProductsListSkeleton /> : null}
          </ListContainer>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[APP_COLORS.secondary]}
          />
        }
      />
    </CustomSafeAreaView>
  );
}
