import { View, Text } from "react-native";
import Card from "../../Card";
import Shimmer from "../../Shimmer/index";

export default function OrderCardSkeleton() {
  return (
    <Card additionalStyles="p-3 space-y-2">
      <View className="flex flex-row justify-between">
        <View className="w-3/12 h-20 rounded-sm overflow-hidden">
          <Shimmer />
        </View>

        <View className="w-8/12 flex flex-col space-y-5">
          <View className="flex flex-col space-y-1">
            <View className="h-6 rounded-sm overflow-hidden">
              <Shimmer />
            </View>

            <View className="w-7/12 h-4 rounded-sm overflow-hidden">
              <Shimmer />
            </View>
          </View>

          <View className="space-y-1">
            <View className="flex flex-row justify-between">
              <View className="w-6/12 h-4 rounded-sm overflow-hidden pr-1">
                <Shimmer />
              </View>

              <View className="w-4/12 h-4 rounded-sm overflow-hidden pl-1">
                <Shimmer />
              </View>
            </View>

            <View className="flex flex-row justify-between">
              <View className="w-6/12 h-4 rounded-sm overflow-hidden pr-1">
                <Shimmer />
              </View>

              <View className="w-5/12 h-4 rounded-sm overflow-hidden pl-1">
                <Shimmer />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="bg-gray-100 flex flex-row justify-between p-1 rounded-md">
        <View className="w-3/12 flex flex-col space-y-3">
          <View className="w-7/12 h-3 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>

          <View className="w-7/12 h-3 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>
        </View>

        <View className="w-2/12 flex flex-col space-y-3">
          <View className="h-3 rounded-sm overflow-hidden">
            <Shimmer />
          </View>

          <View className="w-8/12 h-3 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>
        </View>

        <View className="w-2/12 flex flex-col space-y-3">
          <View className="h-3 rounded-sm overflow-hidden">
            <Shimmer />
          </View>

          <View className="w-8/12 h-3 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>
        </View>

        <View className="w-3/12 flex flex-col space-y-3">
          <View className="h-3 w-6/12 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>

          <View className="w-10/12 h-3 rounded-sm overflow-hidden mx-auto">
            <Shimmer />
          </View>
        </View>
      </View>
    </Card>
  );
}
