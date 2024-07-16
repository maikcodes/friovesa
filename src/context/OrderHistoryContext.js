import { createContext, useState } from "react";

export const OrderHistoryContext = createContext();

export function OrderHistoryContextProvider({ children }) {
  const [orderHistory, setOrderHistory] = useState({});

  const onSelectOrderHistory = (order) => {
    setOrderHistory(order);
  };

  return (
    <OrderHistoryContext.Provider
      value={{
        orderHistory,
        onSelectOrderHistory,
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
}
