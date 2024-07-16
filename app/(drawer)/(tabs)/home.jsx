import { Carousel, CustomSafeAreaView } from "../../../src/components";
import {
  FOOTER_CAROUSEL,
  HEADER_CAROUSEL,
} from "../../../src/constants/imagesCarousel";
import { gyeIcon, uioIcon } from "../../../src/constants/icons";
import { router, usePathname } from "expo-router";
import { ScrollView } from "react-native";
import { Text, View } from "react-native";
import { TouchableCity } from "../../../src/components/Touchable";
import lang from "../../../src/lang/es";

export default function Home() {
  const pathname = usePathname();

  const isTheCurrentScreen = () => pathname === "/home";

  return (
    <CustomSafeAreaView>
      <View className="px-4">
        <ScrollView
          className="pt-4 space-y-5 flex flex-col"
          showsVerticalScrollIndicator={false}
        >
          <Carousel
            images={HEADER_CAROUSEL}
            heightScale={2.5}
            autoPlay={isTheCurrentScreen()}
          />

          <View className="flex flex-col space-y-2 mb-5">
            <Text className="text-primary font-bold text-xl text-center">
              {lang.selectYourCity}
            </Text>

            <View className="w-full">
              <View className="flex flex-row justify-center">
                <View className="w-1/2 pr-3">
                  <TouchableCity
                    cityTitle={lang.uioCity}
                    cityIcon={uioIcon}
                    handlePress={() => router.push("(tabs)/Uio")}
                  />
                </View>

                <View className="w-1/2 pl-3">
                  <TouchableCity
                    cityTitle={lang.gyeCity}
                    cityIcon={gyeIcon}
                    handlePress={() => router.push("(tabs)/Gye")}
                  />
                </View>
              </View>
            </View>
          </View>

          <Carousel
            images={FOOTER_CAROUSEL}
            heightScale={1.8}
            autoPlay={isTheCurrentScreen()}
          />
          <View className="h-10" />
        </ScrollView>
      </View>
    </CustomSafeAreaView>
  );
}
