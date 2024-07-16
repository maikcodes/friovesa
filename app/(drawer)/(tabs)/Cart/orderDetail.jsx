import { ControlButtonSuccess } from "../../../../src/components/Buttons";
import {
  CustomSafeAreaView,
  ErrorResults,
  ListContainer,
} from "../../../../src/components";
import {
  DirectTransferGateway,
  OrderedProductSectionTitle,
} from "../../../../src/components/Checkout";
import { DirectTransferGatewaySkeleton } from "../../../../src/components/Checkout";
import { OrderTotals, OrderedProduct } from "../../../../src/components/Orders";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { usePaymentGateways } from "../../../../src/hooks/usePaymentGateways";
import { View, Text } from "react-native";
import lang from "../../../../src/lang/es";
import useCart from "../../../../src/hooks/useCart";
import useCheckout from "../../../../src/hooks/useCheckout";

export default function OrderDetail() {
  const { paymentGateway, isLoading, isError } = usePaymentGateways();
  const { clearCart } = useCart();
  const { createdOrder } = useCheckout();

  const orderTotals = {
    paymentMethodTitle: createdOrder?.paymentMethodTitle,
    shippingMethod: createdOrder?.shippingMethod,
    shippingTotal: createdOrder?.shippingTotal,
    subtotal: createdOrder?.subtotal,
    totalTax: createdOrder?.totalTax,
    total: createdOrder?.total,
  };
  const date = new Date(createdOrder?.dateCreated).toLocaleDateString("es-ec", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = new Date(createdOrder?.dateCreated).toLocaleTimeString("es-ec", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    clearCart();
  }, [createdOrder]);

  const handleGoToHome = () => {
    router.back();
    router.replace("(drawer)/(tabs)/home");
  };

  return (
    <CustomSafeAreaView>
      <ScrollView className="p-2 space-y-2">
        <ListContainer>
          <View>
            <View className="flex flex-row space-x-2 justify-end">
              <Text className="text-base text-copy-light capitalize">
                {date}
              </Text>

              <Text className="text-base text-copy-light capitalize">|</Text>

              <Text className="text-base text-copy-light capitalize">
                {time}
              </Text>
            </View>

            <View className="bg-gray-200 rounded-md p-3">
              <Text className="text-base font-bold">{lang?.orderSent}</Text>

              <View className="flex flex-row justify-between">
                <Text className="text-lg">{lang?.orderNumber}</Text>

                <Text className="text-lg font-bold"># {createdOrder?.id}</Text>
              </View>
            </View>
          </View>

          <View className="pt-3">
            <OrderedProductSectionTitle title={lang?.ourBankingData} />
          </View>

          {isLoading && <DirectTransferGatewaySkeleton />}

          {isError && (
            <View>
              <ErrorResults
                infoMessage={lang?.failedBakingData}
                showGoBack={false}
              />
            </View>
          )}

          {!isLoading && !isError && paymentGateway && (
            <View>
              <DirectTransferGateway gateway={paymentGateway} />
            </View>
          )}

          <View className="pt-3">
            <OrderedProductSectionTitle title={lang?.orderDetail} />
          </View>

          <View className="pt-1 pb-5 space-y-2">
            <View>
              {createdOrder?.products?.map((item, index) => (
                <OrderedProduct key={index} product={item} />
              ))}
            </View>

            <View>
              <OrderTotals order={orderTotals} />
            </View>

            <View className="pt-3">
              <OrderedProductSectionTitle title={lang?.paymentInstructions} />
            </View>

            <View>
              {!isLoading && !isError && paymentGateway && (
                <>
                  <Text className="text-base">
                    {paymentGateway?.instructions}
                  </Text>

                  <Text className="text-base pt-4">
                    {lang?.transferenceInstructions}
                  </Text>
                </>
              )}
            </View>

            <View className="pt-3">
              <ControlButtonSuccess
                title={lang?.backToShopping}
                handlePress={handleGoToHome}
              />
            </View>
          </View>
        </ListContainer>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
