import { APP_COLORS } from "../../constants/colors";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { menuIcon, logoIcon, cartIcon } from "../../constants/icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HeaderIcon from "./HeaderIcon";
import useCart from "../../hooks/useCart";

export default function AppHeader(props) {
  const { itemsCount } = useCart();
  const navigation = props?.navigation;

  const handleToggleDrawer = () => {
    if (!navigation || typeof navigation.toggleDrawer !== "function") {
      return;
    }

    try {
      navigation.toggleDrawer();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SafeAreaView className="bg-primary py-3 px-3 flex flex-row justify-between items-center">
        <TouchableOpacity onPress={handleToggleDrawer} className="w-2/12">
          <View className="mx-auto">
            <HeaderIcon icon={menuIcon} color={APP_COLORS.foreground} />
          </View>
        </TouchableOpacity>

        <View className="w-6/12 h-8 md:w-4/12 md:h-12">
          <Image source={logoIcon} className="w-full h-full md:w-44 md:h-11 md:mx-auto" />
        </View>

        <TouchableOpacity
          onPress={() => router.navigate("(tabs)/Cart")}
          className="w-2/12"
        >
          <View className="mx-auto">
            {itemsCount > 0 && (
              <View className="absolute right-0 bg-red-500 rounded-full h-4 flex justify-center items-center z-10 px-1">
                <Text className="text-xs text-white" numberOfLines={1}>
                  {itemsCount}
                </Text>
              </View>
            )}

            <HeaderIcon icon={cartIcon} color={APP_COLORS.foreground} />
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      <StatusBar style="light" />
    </>
  );
}
