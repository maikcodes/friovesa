import { CheckoutProvider } from "../../../../src/context/CheckoutContext";
import { Stack } from "expo-router";

export default function CartLayout() {
  return (
    <CheckoutProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="orderDetail"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </CheckoutProvider>
  );
}
