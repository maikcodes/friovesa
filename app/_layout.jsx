import "react-native-gesture-handler";
import { APP_COLORS } from "../src/constants/colors";
import { AuthProvider } from "../src/context/AuthContext";
import { CustomToast } from "../src/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useFonts } from "expo-font";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("../src/assets/fonts/Roboto-Regular.ttf"),
    "Raleway-Regular": require("../src/assets/fonts/Raleway-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: APP_COLORS.primary,
            },
            headerTitleStyle: {
              color: APP_COLORS.foreground,
            },
          }}
        >
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style="light" />
        <CustomToast />
      </QueryClientProvider>
    </AuthProvider>
  );
}
