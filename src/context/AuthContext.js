import { Auth } from "../services/Auth";
import { createContext, useEffect, useState } from "react";
import { UserDataManager } from "../lib/UserDataManager";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
  });
  console.log("🚀 ~ AuthProvider ~ user:", user)

  const onLogin = () => {
    setIsLogged(true);
  };

  const onLogout = async () => {
    await Auth.logout();
    setIsLogged(false);
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const isLoggedIn = await Auth.isLoggedIn();

      if (!isLoggedIn) {
        setIsLoading(false);
        return;
      }

      const userData = await UserDataManager.getData();
      setUser(userData);
      setIsLogged(isLoggedIn);
      setIsLoading(false);
    };

    checkIfLoggedIn();
  }, [isLogged]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLogged,
        onLogin,
        onLogout,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
