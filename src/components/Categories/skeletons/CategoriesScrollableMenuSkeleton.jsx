import { ScrollView, View } from "react-native";
import Shimmer from "../../Shimmer";

export default function CategoriesScrollableMenuSkeleton() {
  const items = Array.from({ length: 5 }, (_, i) => ({
    id: i,
  }));

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex flex-row space-x-5 p-2 h-20">
        {items.map((item) => (
          <View key={item.id}>
            <View className="flex flex-col space-y-2 items-center bg-gray-50 py-1 px-2 rounded-md">
              <View className="h-10 w-10 overflow-hidden rounded-sm">
                <Shimmer />
              </View>

              <View className="h-[10px] w-16 rounded-sm overflow-hidden">
                <Shimmer />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
