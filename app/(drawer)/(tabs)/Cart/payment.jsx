import { ActivityIndicator, Text, View } from "react-native";
import { APP_COLORS } from "../../../../src/constants/colors";
import { CartCheckoutNavigationButtons } from "../../../../src/components/Checkout";
import {
  ControlButtonCancel,
  ControlButtonSuccess,
} from "../../../../src/components/Buttons";
import { errorToast, successToast } from "../../../../src/lib/Toast";
import { PaymentMethod } from "../../../../src/components/Checkout";
import { useEffect, useState } from "react";
import { usePaymentMethods } from "../../../../src/hooks/usePaymentMethods";
import CustomModal from "../../../../src/components/CustomModal";
import lang from "../../../../src/lang/es";
import useAuth from "../../../../src/hooks/useAuth";
import useCart from "../../../../src/hooks/useCart";
import useCheckout from "../../../../src/hooks/useCheckout";
import useOrder from "../../../../src/hooks/useOrder";

export default function Payment({ handleBack, handleNext }) {
  const { cart } = useCart();
  const { user } = useAuth();
  const { paymentMethods } = usePaymentMethods();
  const {
    paymentMethod,
    onchangePaymentMethod,
    onCreateOrder,
    shippingZone,
    address,
  } = useCheckout();
  const { createOrder, isLoading, isError, createdOrder } = useOrder();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    onchangePaymentMethod(paymentMethods[0]);
  }, []);

  useEffect(() => {
    const handleAsyncOperations = async () => {
      if (isLoading) return;

      if (isError) {
        errorToast({
          title: lang.failedCreateOrder,
        });
        return;
      }

      if (createdOrder) {
        await onCreateOrder(createdOrder);
        successToast({
          title: lang.successCreateOrder,
        });
        handleNext();
      }
    };

    handleAsyncOperations();
  }, [isLoading, isError, createdOrder]);

  const handleOpenConfirmation = () => {
    setOpenModal(true);
  };

  const handleCreateOrder = async () => {
    setOpenModal(false);
    await createOrder({
      shippingZone,
      paymentMethod,
      address,
      cart,
      customerId: user?.id,
    });
  };

  return (
    <>
      {paymentMethods?.map((method, index) => (
        <PaymentMethod
          key={index}
          method={method}
          isSelected={paymentMethod?.id === method?.id}
        />
      ))}

      <CartCheckoutNavigationButtons
        handleBack={handleBack}
        handleNext={handleOpenConfirmation}
      />

      <CustomModal isOpen={openModal} handleClose={() => setOpenModal(false)}>
        <View className="bg-white w-11/12 p-4 rounded-md">
          <View className="py-2 mb-4 space-y-5">
            <Text className="text-lg font-bold">{lang?.areYouSureToOrder}</Text>

            <View className="space-y-2">
              <Text className="text-base">{lang?.orderWillBeGenerated}</Text>

              <Text className="text-base">
                {lang?.transferenceInstructions}
              </Text>
            </View>
          </View>

          <View className="md:flex md:flex-row">
            <View className="md:w-6/12 md:pr-2">
              <ControlButtonSuccess
                title={lang?.continue}
                handlePress={handleCreateOrder}
              />
            </View>

            <View className="md:w-6/12 md:pl-2 pt-2 md:pt-0">
              <ControlButtonCancel
                title={lang?.cancel}
                handlePress={() => setOpenModal(false)}
              />
            </View>
          </View>
        </View>
      </CustomModal>

      <CustomModal isOpen={isLoading}>
        <View className="p-2 bg-white rounded-full shadow-md shadow-black">
          <ActivityIndicator size="large" color={APP_COLORS.secondary} />
        </View>
      </CustomModal>
    </>
  );
}
