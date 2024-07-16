import { ActiveProductProvider } from "../../../src/context/ActiveProductContext";
import { APP_COLORS } from "../../../src/constants/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  TabBarIcon,
  TabBarIconCart,
  TabBarIconLabel,
} from "../../../src/components/TabBar";
import { Tabs } from "expo-router";
import {
  uioIcon,
  gyeIcon,
  homeIcon,
  cartIcon,
  userIcon,
} from "../../../src/constants/icons";
import lang from "../../../src/lang/es";

export default function TabLayout() {
  return (
    <ActiveProductProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tabs
          initialRouteName="home"
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: APP_COLORS.secondary,
            tabBarInactiveTintColor: APP_COLORS.foreground,
            tabBarStyle: {
              backgroundColor: APP_COLORS.primary,
              height: 60,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "",
              tabBarIcon: ({ color }) => (
                <TabBarIcon icon={homeIcon} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Uio"
            options={{
              title: "",
              tabBarIcon: ({ color }) => (
                <TabBarIconLabel
                  icon={uioIcon}
                  title={lang.uio}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Cart"
            options={{
              title: "",
              tabBarIcon: () => <TabBarIconCart icon={cartIcon} />,
            }}
          />
          <Tabs.Screen
            name="Gye"
            options={{
              title: "",
              tabBarIcon: ({ color }) => (
                <TabBarIconLabel
                  icon={gyeIcon}
                  title={lang.gye}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Settings"
            options={{
              title: "",
              tabBarIcon: ({ color }) => (
                <TabBarIcon icon={userIcon} color={color} />
              ),
            }}
          />
        </Tabs>
      </GestureHandlerRootView>

      <StatusBar style="light" />
    </ActiveProductProvider>
  );
}
