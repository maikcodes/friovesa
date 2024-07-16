import { View, Text, Image, TouchableOpacity } from "react-native";
import Card from "../Card";

export default function CategoryCard({ category, handlePress }) {
  return (
    <Card additionalStyles="h-36">
      <TouchableOpacity
        className="h-full w-full space-y-1 flex flex-col justify-center items-center p-2"
        onPress={handlePress}
      >
        <View className="mx-auto">
          <View className="w-20 h-20 overflow-hidden">
            <Image
              source={{ uri: category.imageUrl }}
              className="w-full h-full"
            />
          </View>
        </View>
        <View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="text-primary text-center"
          >
            {category.name}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
