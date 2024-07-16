import { Accordion, CustomSafeAreaView, ListContainer } from "../../components";
import {
  ProductDetailsInfo,
  RelatedProductsList,
} from "../../components/Products";
import { View, Text, ScrollView, Image, Linking } from "react-native";
import { WebView } from "react-native-webview";
import lang from "../../lang/es";

export default function ProductDetailsScreen({ productData }) {
  const handleShouldStartLoad = (event) => {
    const { url } = event;

    if (url.startsWith("http://") || url.startsWith("https://")) {
      Linking.openURL(url);
    }

    return false;
  };

  const { id, price, name, imageUrl, description, categories, relatedIds } =
    productData;

  const categoriesArray = categories.split(",");
  const relatedIdsArray = relatedIds.split(",");

  return (
    <CustomSafeAreaView>
      <ScrollView className="space-y-5" showsVerticalScrollIndicator={false}>
        <View className="w-full h-72 ">
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>

        <ListContainer>
          <View className="px-4 space-y-5">
            <View>
              <Text className="text-xl font-bold">{name}</Text>

              <Text className="text-xl">{price}</Text>
            </View>

            <ProductDetailsInfo productId={id} />

            <View className="space-y-2">
              <View>
                {description.trim() !== "" && (
                  <Accordion title={lang.description} maxHeight={900}>
                    <WebView
                      originWhitelist={["*"]}
                      source={{
                        html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${description}</body></html>`,
                      }}
                      style={{ height: 800, flex: 1 }}
                      onShouldStartLoadWithRequest={handleShouldStartLoad}
                    />
                  </Accordion>
                )}
              </View>

              <View>
                <Accordion title={lang.categories} maxHeight={170}>
                  <View className="flex flex-row flex-wrap">
                    {categoriesArray?.map((category, index) => (
                      <Text
                        key={index}
                        className="text-secondary font-bold uppercase text-base py-2 px-3"
                      >
                        {category}
                      </Text>
                    ))}
                  </View>
                </Accordion>
              </View>
            </View>

            <View>
              <RelatedProductsList
                productId={id}
                relatedIds={relatedIdsArray}
              />
            </View>
          </View>
        </ListContainer>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
