import { AppHeader } from "../../src/components/Header";
import { CartProvider } from "../../src/context/CartContext";
import { CustomDrawerMenu } from "../../src/components";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <CartProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer drawerContent={(props) => <CustomDrawerMenu {...props} />}>
          <Drawer.Screen
            name="(tabs)"
            options={{
              header: (props) => {
                return <AppHeader {...props} />;
              },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </CartProvider>
  );
}
