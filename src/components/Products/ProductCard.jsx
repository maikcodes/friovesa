import { Image, Pressable, Text, View } from "react-native";
import { router, usePathname } from "expo-router";
import { useCallback } from "react";
import Card from "../Card";
import lang from "../../lang/es";
import ProductCartControl from "./ProductCartControl";

function ProductCard({ product, showButton = true }) {
  const pathName = usePathname();
  const maxQuantity = product?.stockQuantity;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product?.price);

  const handlePress = useCallback(() => {
    const city = pathName.split("/")[1];
    const categories = product?.categories.join(",");
    const relatedIds = product?.relatedIds.join(",");

    const extraParams = {
      product: product?.id,
      price: formattedPrice,
      name: product?.name,
      imageUrl: product?.imageUrl,
      inStock: product?.inStock,
      description: product?.description,
      categories,
      relatedIds,
    };

    const params = new URLSearchParams(extraParams);
    router.push(`/${city}/product/${product?.id}?${params}`);
  }, [pathName, product]);

  if (product?.price == 0) return null;

  return (
    <Card additionalStyles="h-48">
      <Pressable className="h-full w-full" onPress={handlePress}>
        <View className="h-28 w-full rounded-t-md overflow-hidden">
          <Image
            source={{ uri: product?.imageUrl }}
            className="h-full w-full object-cover"
          />

          <View className="absolute bottom-1 right-1 p-1">
            {showButton && product?.inStock && (
              <ProductCartControl maxQuantity={maxQuantity} product={product} />
            )}
          </View>
        </View>
        <View className="p-2">
          <Text className="text-sm" numberOfLines={1} ellipsizeMode="tail">
            {product?.name}
          </Text>
          <Text className="text-lg font-bold">{formattedPrice}</Text>
          <View>
            {product?.inStock ? (
              <Text className="text-xs text-in-stock">{lang.inStock}</Text>
            ) : (
              <Text className="text-xs text-out-of-stock">
                {lang.outOfStock}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </Card>
  );
}

export default ProductCard;
