import { createContext, useState } from "react";

export const ActiveProductContext = createContext();

export function ActiveProductProvider({ children }) {
  const [productId, setProductId] = useState(null);

  const onProductSelect = (id) => {
    setProductId(id);
  };

  const onProductDeselect = () => {
    setProductId(null);
  };

  const isSelected = (id) => {
    return productId === id;
  };

  return (
    <ActiveProductContext.Provider
      value={{
        isSelected,
        onProductDeselect,
        onProductSelect,
      }}
    >
      {children}
    </ActiveProductContext.Provider>
  );
}
