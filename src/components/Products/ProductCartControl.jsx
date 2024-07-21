import { APP_COLORS } from "../../constants/colors";
import { errorToast } from "../../lib/Toast";
import { memo, useCallback } from "react";
import { minusIcon, plusIcon } from "../../constants/icons";
import { usePathname } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import lang from "../../lang/es";
import useActiveProduct from "../../hooks/useActiveProduct";
import useCart from "../../hooks/useCart";

function ProductCartControl({ maxQuantity, product }) {
  const { isSelected, onProductSelect } = useActiveProduct();
  const { addToCart, decrementQuantity, productQuantity, cityName } = useCart();
  const initialQuantity = productQuantity(product.id);
  const [quantity, setQuantity] = useState(initialQuantity);
  const pathName = usePathname();

  const pathCityName = pathName.split("/")[1];

  useEffect(() => {
    setQuantity(productQuantity(product.id));
  }, [initialQuantity]);

  const handlePressAddToCart = useCallback(() => {
    if (cityName !== "" && cityName !== pathCityName) {
      errorToast({
        title: lang?.onlyCanBuyInOneCity,
        subtitle: lang?.toBuyInAnotherCity,
        slow: true,
      });

      return;
    }

    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
    addToCart(product, pathCityName);
    onProductSelect(product.id);
  }, [quantity, cityName, pathCityName]);

  const handlePressRemoveFromCart = useCallback(() => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
    decrementQuantity(product.id);
  }, [quantity]);

  return (
    <>
      {quantity > 0 ? (
        <Pressable
          className="flex flex-row justify-center border shadow-md shadow-black bg-gray-100 rounded-lg border-gray-400"
          onPress={(e) => {
            e.stopPropagation();
            onProductSelect(product.id);
          }}
        >
          {isSelected(product.id) && (
            <Pressable onPress={handlePressRemoveFromCart}>
              <View className="w-9 h-9 md:w-12 md:h-12 p-2 ">
                <Image
                  source={minusIcon}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  tintColor={APP_COLORS.secondary}
                />
              </View>
            </Pressable>
          )}

          <View className="px-1 w-9 h-9 md:w-12 md:h-12 flex flex-row items-center">
            <Pressable
              className="w-full"
              onPress={() => onProductSelect(product.id)}
            >
              <Text
                className="text-xs text-center font-bold md:text-md"
                numberOfLines={2}
              >
                {quantity}
              </Text>
            </Pressable>
          </View>

          {isSelected(product.id) && (
            <Pressable onPress={handlePressAddToCart}>
              <View className="w-9 h-9 md:w-12 md:h-12 p-2">
                <Image
                  source={plusIcon}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  tintColor={APP_COLORS.secondary}
                />
              </View>
            </Pressable>
          )}
        </Pressable>
      ) : (
        <Pressable onPress={handlePressAddToCart}>
          <View className="w-9 h-9 md:w-12 md:h-12 p-2 bg-secondary rounded-lg shadow-md shadow-black border border-secondary">
            <Image
              source={plusIcon}
              style={{
                width: "100%",
                height: "100%",
              }}
              tintColor={APP_COLORS.foreground}
            />
          </View>
        </Pressable>
      )}
    </>
  );
}

export default memo(ProductCartControl);
