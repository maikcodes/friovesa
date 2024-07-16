import { APP_COLORS } from "../../constants/colors";
import { minusIcon, plusIcon } from "../../constants/icons";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function ProductsQuantityPicker({
  minQuantity = 1,
  maxQuantity = 10,
  quantity = 1,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) {
  const isMinQuantity = quantity === minQuantity;
  const isMaxQuantity = quantity === maxQuantity;

  return (
    <View className="w-full flex flex-row pl-2 justify-between">
      <View className="w-2/12 flex flex-row justify-start">
        <TouchableOpacity
          onPress={handleDecreaseQuantity}
          disabled={isMinQuantity}
        >
          <View
            className={`${
              isMinQuantity ? "bg-gray-100" : "bg-secondary"
            } w-8 h-8 p-2  rounded-sm `}
          >
            <Image
              source={minusIcon}
              style={{
                width: "100%",
                height: "100%",
              }}
              tintColor={
                isMinQuantity ? APP_COLORS.copyLighter : APP_COLORS.foreground
              }
            />
          </View>
        </TouchableOpacity>
      </View>

      <View className="w-6/12 flex flex-row items-center justify-center border-2 border-gray-100 rounded-sm">
        <Text className="text-center">{quantity}</Text>
      </View>

      <View className="w-2/12 flex flex-row justify-end">
        <TouchableOpacity
          onPress={handleIncreaseQuantity}
          disabled={isMaxQuantity}
        >
          <View
            className={`${
              isMaxQuantity ? "bg-gray-100" : "bg-secondary"
            } w-8 h-8 p-2  rounded-sm `}
          >
            <Image
              source={plusIcon}
              style={{
                width: "100%",
                height: "100%",
              }}
              tintColor={
                isMaxQuantity ? APP_COLORS.copyLighter : APP_COLORS.foreground
              }
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
