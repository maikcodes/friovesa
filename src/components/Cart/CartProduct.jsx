import { APP_COLORS } from "../../constants/colors";
import { Picker } from "@react-native-picker/picker";
import { removeIcon } from "../../constants/icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, Image } from "react-native";

export default function CartProduct({
  product,
  handleSetQuantity,
  handleRemoveFromCart,
}) {
  const { imageUrl, name, price, stockQuantity, quantity, id } = product;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return (
    <View className="flex flex-col space-y-2 mx-1">
      <View className="flex-row justify-between">
        <View className="w-1/12 my-auto flex flex-row justify-center">
          <TouchableOpacity onPress={() => handleRemoveFromCart(id)}>
            <Image
              className="w-6 h-6 md:w-8 md:h-8"
              source={removeIcon}
              style={{
                tintColor: APP_COLORS.copyDarkLighter,
              }}
            />
          </TouchableOpacity>
        </View>

        <View className="w-4/12 md:w-3/12">
          <View className="h-24 md:h-36 w-full rounded-md overflow-hidden">
            <Image
              source={{ uri: imageUrl }}
              className="h-full w-full object-cover"
            />
          </View>
        </View>

        <View className="w-6/12 md:w-7/12 flex flex-col space-y-1">
          <Text numberOfLines={2} ellipsizeMode="tail">
            {name}
          </Text>

          <View className="flex flex-row space-x-1 flex-wrap">
            <Text className="text-lg">{formattedPrice}</Text>
          </View>

          <View className="w-9/12 border border-border rounded-md">
            <Picker
              selectedValue={quantity}
              onValueChange={(itemValue) => handleSetQuantity(id, itemValue)}
              style={{
                marginHorizontal: -5,
                marginVertical: -10,
              }}
            >
              {Array.from({ length: stockQuantity }, (_, i) => (
                <Picker.Item label={i + 1} value={i + 1} key={i} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
}
