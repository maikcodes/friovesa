import { createContext, useEffect, useState } from "react";
import { PlainStorage } from "../lib/PlainStorage";

export const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [createdOrder, setCreatedOrder] = useState({});

  const [address, setAddress] = useState({
    businessType: "",
    documentType: "",
    identification: "",
    name: "",
    lastName: "",
    address: "",
    addressStreet: "",
    sector: "",
    phone: "",
    email: "",
    addressLatitude: "",
    addressLongitude: "",
    additionalNotes: "",
  });

  const [shippingZone, setShippingZone] = useState({
    id: "",
    instanceId: "",
    title: "",
    order: "",
    description: "",
    costPerOrder: "",
    methodId: "",
    isSelected: false,
  });

  const [paymentMethod, setPaymentMethod] = useState({
    id: "",
    title: "",
  });

  useEffect(() => {
    const prepareAddress = async () => {
      console.log("prepareAddress");
      const storedAddress = await PlainStorage.getValueByKey("address");
      const storedAddressParsed = JSON.parse(storedAddress);
      if (storedAddressParsed) {
        setAddress(storedAddressParsed);
      }
    };

    prepareAddress();
  }, []);

  const onChangeAddress = (value, key) => {
    setAddress((prev) => ({ ...prev, [key]: value }));
  };

  const onSaveAddress = async () => {
    await PlainStorage.save("address", JSON.stringify(address));
  };
  
  const onChangeShippingZone = ({
    id,
    instanceId,
    title,
    order,
    description,
    costPerOrder,
    methodId,
  }) => {
    setShippingZone({
      id,
      instanceId,
      title,
      order,
      description,
      costPerOrder,
      methodId,
      isSelected: true,
    });
  };

  const onchangePaymentMethod = ({ id, title }) => {
    setPaymentMethod({ id, title });
  };

  const onCreateOrder = async (order) => {
    setCreatedOrder(order);
  };

  return (
    <CheckoutContext.Provider
      value={{
        address,
        createdOrder,
        onChangeAddress,
        onchangePaymentMethod,
        onChangeShippingZone,
        onCreateOrder,
        onSaveAddress,
        paymentMethod,
        shippingZone,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
