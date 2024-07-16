import { CustomWebView } from "../../src/components";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { termsAndConditions } from "../../src/constants/appInfo";
import { View } from "react-native";
import lang from "../../src/lang/es";

export default function Policy() {
  return (
    <SafeAreaView className="bg-background h-full">
      <CustomWebView
        htmlContent={`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${termsAndConditions}</body><style> h1, h4 { color: #003e80; } </style></html>`}
      />
      <View className="flex flex-col items-center py-3">
        <Link className="text-secondary text-base" href="../">
          {lang.goBack}
        </Link>
      </View>
    </SafeAreaView>
  );
}
