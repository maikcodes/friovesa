import { APP_COLORS } from "../../constants/colors";
import { View, Text, Image } from "react-native";
import useCart from "../../hooks/useCart";

export default function TabBarIconCart({ icon }) {
  const { itemsCount } = useCart();

  return (
    <View className="bg-secondary p-3 rounded-full -translate-y-7 shadow-sm shadow-black">
      {itemsCount > 0 && (
        <View className="absolute top-2 right-2 bg-red-500 rounded-full h-4 flex justify-center items-center z-10 px-1">
          <Text className="text-xs text-white" numberOfLines={1}>
            {itemsCount}
          </Text>
        </View>
      )}
      <Image
        source={icon}
        style={{ width: 25, height: 25, tintColor: APP_COLORS?.foreground }}
      />
    </View>
  );
}
