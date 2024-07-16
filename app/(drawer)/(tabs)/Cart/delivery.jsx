import { CartCheckoutNavigationButtons } from "../../../../src/components/Checkout";
import { ErrorResults } from "../../../../src/components";
import { errorToast } from "../../../../src/lib/Toast";
import {
  ShippingZonesList,
  ShippingZonesListSkeleton,
} from "../../../../src/components/Checkout";
import { useShippingZones } from "../../../../src/hooks/useShippingZones";
import { View } from "react-native";
import lang from "../../../../src/lang/es";
import useCheckout from "../../../../src/hooks/useCheckout";

export default function Delivery({ handleNext, handleBack }) {
  const { isLoading, isError, shippingZones } = useShippingZones();
  const { shippingZone } = useCheckout();

  const handleContinue = () => {
    if (!shippingZone?.isSelected) {
      errorToast({
        title: lang.pleaseSelectShippingZone,
        slow: true,
      });

      return;
    }

    handleNext();
  };

  return (
    <>
      <View>
        {isLoading && <ShippingZonesListSkeleton />}

        {isError && (
          <View className="h-full pt-48">
            <ErrorResults infoMessage={lang?.failedShippingZones} />
          </View>
        )}

        {!isLoading && !isError && shippingZones && (
          <ShippingZonesList shippingZones={shippingZones} />
        )}
      </View>

      {!isLoading && !isError && shippingZones && (
        <CartCheckoutNavigationButtons
          handleBack={handleBack}
          handleNext={handleContinue}
        />
      )}
    </>
  );
}
