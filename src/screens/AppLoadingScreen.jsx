import { APP_COLORS } from "../../src/constants/colors";
import { appIcon } from "../../src/constants/icons";
import { CustomSafeAreaView } from "../../src/components";
import { View, Text, Image } from "react-native";
import lang from "../../src/lang/es";

export default function AppLoadingScreen() {
  return (
    <CustomSafeAreaView>
      <View className="flex flex-col items-center justify-center h-full">
        <View className="w-36 h-36">
          <Image
            source={appIcon}
            style={{
              tintColor: APP_COLORS.primary,
              width: "100%",
              height: "100%",
            }}
          />
        </View>
        <Text className="text-2xl text-primary font-bold ">{lang.welcome}</Text>
      </View>
    </CustomSafeAreaView>
  );
}
