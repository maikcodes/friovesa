import { ActivityIndicator, View } from "react-native";
import { APP_COLORS } from "../constants/colors";

export default function LoadingScreen({ children, isLoading = false }) {
  return (
    <>
      {isLoading && (
        <View className="absolute z-10 w-full min-h-full bg-zinc-900/40 flex flex-row justify-center items-center">
          <View className="p-2 bg-white rounded-full shadow-md shadow-black">
            <ActivityIndicator size="large" color={APP_COLORS.secondary} />
          </View>
        </View>
      )}

      {children}
    </>
  );
}
