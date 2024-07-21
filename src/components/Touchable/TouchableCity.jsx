import { APP_COLORS } from "../../constants/colors";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function TouchableCity({ cityTitle, cityIcon, handlePress }) {
  return (
    <View className="h-44 md:h-72 shadow-sm shadow-black rounded-md bg-white border border-border">
      <TouchableOpacity
        onPress={handlePress}
        className="flex flex-col space-y-2 w-full h-full px-2 pt-3 pb-2"
      >
        <View className="bg-primary rounded-md py-1 md:py-2 md:mb-3">
          <Text className="uppercase text-foreground text-center font-bold text-base md:text-3xl">
            {cityTitle}
          </Text>
        </View>

        <View className="h-28 w-28 md:h-44 md:w-44 bg-primary rounded-full p-5 mx-auto">
          <Image
            source={cityIcon}
            style={{
              tintColor: APP_COLORS.foreground,
              height: "100%",
              width: "100%",
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
