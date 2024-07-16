import {
  CartCheckoutNavigationButtons,
  CartCheckoutProduct,
} from "../../../../src/components/Checkout";
import { sumMoneyList } from "../../../../src/lib/utils";
import { View, Text } from "react-native";
import lang from "../../../../src/lang/es";
import useCart from "../../../../src/hooks/useCart";
import useCheckout from "../../../../src/hooks/useCheckout";

export default function Preview({ handleBack, handleNext }) {
  const { cart, total } = useCart();
  const { shippingZone } = useCheckout();

  const totalSum = sumMoneyList([total, shippingZone?.costPerOrder]);

  return (
    <>
      <View className="py-1">
        {cart?.map((item, index) => (
          <View key={index}>
            <CartCheckoutProduct product={item} />

            <View className="h-[1px] bg-gray-100 mt-2 mb-4" />
          </View>
        ))}

        <View className="w-full px-2">
          <View className="mb-4 space-y-2 p-2">
            <View className="w-full flex flex-wrap flex-row justify-between">
              <Text className="text-copy-light text-base">
                {lang.subtotal}:
              </Text>

              <Text className="text-copy-light text-base">{total}</Text>
            </View>

            <View className="w-full flex flex-wrap flex-row justify-between">
              <Text className="text-copy-light text-base">
                {lang.shipping}:
              </Text>

              <Text className="text-copy-light text-base">
                {shippingZone?.costPerOrder}
              </Text>
            </View>

            <View className="w-full flex flex-wrap flex-row justify-between">
              <Text className="text-copy-light text-xl font-bold">
                {lang.total}
              </Text>

              <Text className="text-copy-light text-xl font-bold">
                {totalSum}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <CartCheckoutNavigationButtons
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </>
  );
}
