import { View, Text, Image } from "react-native";
import lang from "../../lang/es";

export default function OrderedProduct({ product }) {
  const { imageUrl, name, total, quantity } = product;

  return (
    <View>
      <View className="flex flex-col space-y-2">
        <View className="flex-row justify-between">
          <View className="w-3/12 h-20">
            <Image
              source={{ uri: imageUrl }}
              className="h-full w-full object-cover"
            />
          </View>

          <View className="w-8/12 flex flex-col space-y-1">
            <Text className="text-base font-bold">{name}</Text>

            <View className="text-base">
              <Text>{lang?.quantity}: {quantity}</Text>
            </View>

            <View className="text-base">
              <Text className="">{lang?.total}: {total}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="h-[1px] bg-gray-100 mt-2 mb-4" />
    </View>
  );
}
