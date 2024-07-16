import { Stack } from "expo-router";
import { OrderHistoryContextProvider } from "../../../../src/context/OrderHistoryContext";

export default function SettingsLayout() {
  return (
    <OrderHistoryContextProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="aboutUs"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="termsAndConditions"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ordersHistory"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="orderHistory/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </OrderHistoryContextProvider>
  );
}
