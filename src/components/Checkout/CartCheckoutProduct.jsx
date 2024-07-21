import { View, Text, Image } from "react-native";
import { convertToMoney } from "../../lib/utils";

export default function CartCheckoutProduct({ product }) {
  const { imageUrl, name, price, quantity } = product;
  const formattedPrice = convertToMoney(price);

  return (
    <View className="flex flex-col space-y-2 mx-1">
      <View className="flex-row justify-between">
        <View className="w-4/12 md:w-3/12">
          <View className="h-24 md:h-36 w-full rounded-md overflow-hidden">
            <Image
              source={{ uri: imageUrl }}
              className="h-full w-full object-cover"
            />
          </View>
        </View>

        <View className="w-7/12 flex flex-col space-y-1">
          <Text numberOfLines={2} ellipsizeMode="tail">
            {name}
          </Text>

          <View className="flex flex-row space-x-1 flex-wrap">
            <Text className="text-lg">{formattedPrice}</Text>
          </View>

          <View className="w-7/12 border border-border rounded-md px-4 py-2">
            <Text>{quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
