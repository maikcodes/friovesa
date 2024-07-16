import { Dimensions } from "react-native";
import { Image, View } from "react-native";
import ReanimatedCarousel from "react-native-reanimated-carousel";

export default function Carousel({ images, heightScale = 2, autoPlay = false}) {
  const width = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1 }}>
      <ReanimatedCarousel
        loop
        autoPlay={autoPlay}
        maxScrollDistancePerSwipe={width}
        width={width - 30}
        height={width / heightScale}
        data={images}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => (
          <View className="w-full h-full bg-border">
            <Image
              source={{ uri: item }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        )}
      />
    </View>
  );
}
