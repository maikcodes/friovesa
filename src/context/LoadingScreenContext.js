import { createContext, useEffect, useState } from "react";

export const LoadingScreenContext = createContext();

export function LoadingScreenProvider({ children }) {
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  useEffect(() => {
    setIsLoadingScreen(false);
  }, []);

  onChangeLoadingScreen = (loading) => {
    setIsLoadingScreen(loading);
  };

  return (
    <LoadingScreenContext.Provider
      value={{
        isLoadingScreen,
        onChangeLoadingScreen,
      }}
    >
      {children}
    </LoadingScreenContext.Provider>
  );
}
