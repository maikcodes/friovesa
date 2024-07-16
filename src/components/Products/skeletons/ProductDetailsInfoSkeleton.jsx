import { View } from "react-native";
import Shimmer from "../../Shimmer";

export default function ProductDetailsInfoSkeleton() {
  return (
    <View className="space-y-5">
      <View>
        <View className="flex flex-row flex-wrap space-x-2">
          <View className="h-3 w-16">
            <Shimmer />
          </View>

          <View className="h-3 w-24">
            <Shimmer />
          </View>
        </View>

        <View className="flex flex-row flex-wrap space-x-2 mt-2">
          <View className="h-3 w-24">
            <Shimmer />
          </View>

          <View className="h-3 w-32">
            <Shimmer />
          </View>
        </View>
      </View>

      <View className="space-y-3">
        <View className="w-full flex-row">
          <View className="w-1/2 pr-2 h-8 rounded-sm">
            <Shimmer />
          </View>

          <View className="w-1/2 pl-2 h-8 rounded-sm">
            <Shimmer />
          </View>
        </View>

        <View className="w-full flex-row">
          <View className="w-1/2 pr-2 h-12 rounded-sm">
            <Shimmer />
          </View>

          <View className="w-1/2 pl-2 h-12 rounded-sm">
            <Shimmer />
          </View>
        </View>
      </View>
    </View>
  );
}
