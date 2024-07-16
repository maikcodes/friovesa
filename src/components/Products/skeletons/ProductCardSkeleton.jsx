import { View } from "react-native";
import Shimmer from "../../Shimmer/index";
import Card from "../../Card";

export default function ProductCardSkeleton() {
  return (
    <Card additionalStyles="h-48">
      <View className="h-full w-full">
        <View className="h-28 w-full rounded-t-md overflow-hidden">
          <Shimmer />
        </View>

        <View className="p-2 space-y-2">
          <View className="h-3 w-full overflow-hidden rounded-sm">
            <Shimmer />
          </View>

          <View className="h-4 w-2/5 overflow-hidden rounded-sm">
            <Shimmer />
          </View>

          <View className="h-3 w-2/5 overflow-hidden rounded-sm">
            <Shimmer />
          </View>
        </View>
      </View>
    </Card>
  );
}
