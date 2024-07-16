import { Redirect } from "expo-router";
import useAuth from "../src/hooks/useAuth";
import AppLoadingScreen from "../src/screens/AppLoadingScreen";

export default function index() {
  const { isLogged, isLoading } = useAuth();

  if (isLoading) return <AppLoadingScreen />;

  if (!isLoading && isLogged) {
    return (
      <>
        <AppLoadingScreen />
        <Redirect href={"(tabs)/home"} />
      </>
    );
  }

  return <Redirect href={"(auth)/login"} />;
}
