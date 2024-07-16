import { View } from "react-native";
import Card from "../../Card";
import Shimmer from "../../Shimmer";

export default function CategoryCardSkeleton() {
  return (
    <Card additionalStyles="h-36">
      <View className="h-full w-full">
        <View className="p-2 flex flex-col justify-center items-center space-y-2 h-full w-full">
          <View className="mx-auto">
            <View className="h-20 w-20 overflow-hidden rounded-full">
              <Shimmer />
            </View>
          </View>

          <View className="flex flex-row justify-center">
            <View className="h-3 w-4/5 overflow-hidden rounded-sm">
              <Shimmer />
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}
