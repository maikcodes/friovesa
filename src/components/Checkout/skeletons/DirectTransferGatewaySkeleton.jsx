import { View } from "react-native";
import Shimmer from "../../Shimmer";

export default function DirectTransferGatewaySkeleton() {
  return (
    <View className="bg-gray-200 p-4 rounded-md space-y-3">
      <View className="h-5 w-11/12 rounded-sm overflow-hidden">
        <Shimmer />
      </View>

      <View className="flex flex-row justify-between">
        <View className="h-3 rounded-sm overflow-hidden w-5/12">
          <Shimmer />
        </View>

        <View className="h-3 rounded-sm overflow-hidden w-6/12">
          <Shimmer />
        </View>
      </View>

      <View className="flex flex-row justify-between">
        <View className="h-3 rounded-sm overflow-hidden w-7/12">
          <Shimmer />
        </View>

        <View className="h-3 rounded-sm overflow-hidden w-4/12">
          <Shimmer />
        </View>
      </View>

      <View className="flex flex-row justify-between">
        <View className="h-3 rounded-sm overflow-hidden w-5/12">
          <Shimmer />
        </View>

        <View className="h-3 rounded-sm overflow-hidden w-5/12">
          <Shimmer />
        </View>
      </View>

      <View className="flex flex-row justify-between">
        <View className="h-3 rounded-sm overflow-hidden w-5/12">
          <Shimmer />
        </View>

        <View className="h-3 rounded-sm overflow-hidden w-6/12">
          <Shimmer />
        </View>
      </View>
    </View>
  );
}
