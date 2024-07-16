import { errorToast } from "../../lib/Toast";
import { ProductDetailsInfoSkeleton } from "./skeletons";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import lang from "../../lang/es";
import ProductsQuantityPicker from "./ProductsQuantityPicker";
import useCart from "../../hooks/useCart";
import useProduct from "../../hooks/useProduct";

export default function ProductDetailsInfo({ productId }) {
  const { isLoading, isError, product } = useProduct({ id: productId });
  const { addToCart, cityName } = useCart();
  const [quantity, setQuantity] = useState(1);
  const pathName = usePathname();

  const pathCityName = pathName.split("/")[1];

  const handleIncreaseQuantity = (maxQuantity) => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePressAddToCart = () => {
    if (cityName !== "" && cityName !== pathCityName) {
      errorToast({
        title: lang?.onlyCanBuyInOneCity,
        subtitle: lang?.toBuyInAnotherCity,
        slow: true,
      });

      return;
    }

    addToCart(product, pathCityName, quantity);
  };

  const handleBuyNow = () => {
    if (cityName !== "" && cityName !== pathCityName) {
      errorToast({
        title: lang?.onlyCanBuyInOneCity,
        subtitle: lang?.toBuyInAnotherCity,
        slow: true,
      });

      return;
    }

    addToCart(product, pathCityName, quantity);
    router.push("/Cart");
  };

  return (
    <View className="pt-2">
      {isLoading && <ProductDetailsInfoSkeleton />}

      {isError && <Text>{lang.noResults}</Text>}

      {!isLoading && !isError && !product && <Text>{lang.noResults}</Text>}

      {!isLoading && !isError && product && (
        <View className="space-y-5">
          <View>
            <View className="flex flex-row flex-wrap space-x-2">
              <Text>{lang.sku}:</Text>

              <Text className="text-secondary font-bold">{product.sku}</Text>
            </View>

            <View className="flex flex-row flex-wrap space-x-2">
              <Text>{lang.availability}</Text>

              {product.inStock ? (
                <Text className="text-in-stock font-bold">
                  {lang.inStock}{" "}
                  {product.stockQuantity ? `(${product.stockQuantity})` : null}
                </Text>
              ) : (
                <Text className=" text-out-of-stock">{lang.outOfStock}</Text>
              )}
            </View>
          </View>

          <View>
            {product.inStock ? (
              <View className="space-y-3">
                <View className="w-full flex-row">
                  <View className="w-1/2 pr-2 my-auto">
                    <Text className="text-center">
                      {lang.selectTheQuantity}
                    </Text>
                  </View>

                  <View className="w-1/2">
                    <ProductsQuantityPicker
                      quantity={quantity}
                      minQuantity={1}
                      maxQuantity={product?.stockQuantity}
                      handleIncreaseQuantity={() =>
                        handleIncreaseQuantity(product?.stockQuantity)
                      }
                      handleDecreaseQuantity={handleDecreaseQuantity}
                    />
                  </View>
                </View>

                <View className="w-full flex-row">
                  <View className="w-1/2 pr-2">
                    <TouchableOpacity
                      className="bg-secondary py-4 rounded-sm"
                      onPress={handleBuyNow}
                    >
                      <Text className="text-foreground text-center">
                        {lang.buyNow}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="w-1/2 pl-2">
                    <TouchableOpacity
                      className="bg-gray-100 py-4 rounded-sm"
                      onPress={handlePressAddToCart}
                    >
                      <Text className="text-copy-light text-center uppercase">
                        {lang.addToCart}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View className="w-full bg-secondary rounded-sm py-4">
                <Text className="text-center text-foreground uppercase">
                  {lang.notAvailable}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
