import { APP_COLORS } from "../../constants/colors";
import { View, Text, Image } from "react-native";
import useCart from "../../hooks/useCart";

export default function TabBarIconCart({ icon }) {
  const { itemsCount } = useCart();

  return (
    <View className="bg-secondary p-3 md:p-4 rounded-full -translate-y-7 shadow-sm shadow-black">
      {itemsCount > 0 && (
        <View className="md:w-12 bg-transparent absolute top-2 right-2 h-4 flex justify-center items-center z-10">
          <View className="bg-red-500 rounded-full px-1">
            <Text className="text-xs text-white" numberOfLines={1}>
              {itemsCount}
            </Text>
          </View>
        </View>
      )}
      <Image
        source={icon}
        style={{ width: 25, height: 25, tintColor: APP_COLORS?.foreground }}
      />
    </View>
  );
}
