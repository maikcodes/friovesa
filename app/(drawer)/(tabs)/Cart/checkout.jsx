import { CustomSafeAreaView, ListContainer } from "../../../../src/components";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Address from "./address";
import CheckoutStatus from "../../../../src/components/Checkout/CheckoutStatus";
import Delivery from "./delivery";
import lang from "../../../../src/lang/es";
import Payment from "./payment";
import Preview from "./preview";

export default function checkout() {
  const [checkoutState, setCheckoutState] = useState([
    {
      name: lang?.address,
      active: true,
      visited: true,
    },
    {
      name: lang?.shipping,
      active: false,
      visited: false,
    },
    {
      name: lang?.preview,
      active: false,
      visited: false,
    },
    {
      name: lang?.payment,
      active: false,
      visited: false,
    },
  ]);
  const [checkoutIndex, setCheckoutIndex] = useState(0);

  useEffect(() => {
    const updatedState = checkoutState?.map((item, index) => {
      if (index === checkoutIndex) {
        return {
          ...item,
          active: true,
          visited: true,
        };
      }

      return {
        ...item,
        active: false,
      };
    });

    setCheckoutState(updatedState);
  }, [checkoutIndex]);

  const handleContinue = () => {
    if (checkoutIndex === 3) {
      router.replace("(drawer)/(tabs)/Cart/orderDetail");
      return;
    }

    setCheckoutIndex(checkoutIndex + 1);
  };

  const handleBack = () => {
    if (checkoutIndex === 0) {
      router.back();
      return;
    }

    setCheckoutIndex(checkoutIndex - 1);
  };

  const handleMove = (index) => {
    if (index >= checkoutIndex && !checkoutState[index]?.visited) {
      return;
    }

    setCheckoutIndex(index);
  };

  return (
    <CustomSafeAreaView>
      <View className="flex flex-row justify-between p-2 mb-2">
        <CheckoutStatus
          title={lang?.address}
          isChecked={checkoutIndex >= 0}
          index={0}
          handleMove={handleMove}
          isVisited={checkoutState[0]?.visited}
        />

        <CheckoutStatus
          title={lang?.shipping}
          isChecked={checkoutIndex >= 1}
          index={1}
          handleMove={handleMove}
          isVisited={checkoutState[1]?.visited}
        />

        <CheckoutStatus
          title={lang?.preview}
          isChecked={checkoutIndex >= 2}
          index={2}
          handleMove={handleMove}
          isVisited={checkoutState[2]?.visited}
        />

        <CheckoutStatus
          title={lang?.payment}
          isChecked={checkoutIndex >= 3}
          index={3}
          handleMove={handleMove}
          isVisited={checkoutState[3]?.visited}
        />
      </View>

      <ScrollView className="px-2">
        <ListContainer>
          {checkoutState[0]?.active && (
            <Address handleBack={handleBack} handleNext={handleContinue} />
          )}

          {checkoutState[1]?.active && (
            <Delivery handleBack={handleBack} handleNext={handleContinue} />
          )}

          {checkoutState[2]?.active && (
            <Preview handleBack={handleBack} handleNext={handleContinue} />
          )}

          {checkoutState[3]?.active && (
            <Payment handleBack={handleBack} handleNext={handleContinue} />
          )}
        </ListContainer>
      </ScrollView>
    </CustomSafeAreaView>
  );
}
