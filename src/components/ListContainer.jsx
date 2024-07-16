import { View } from "react-native";

export default function ListContainer({ children }) {
  return (
    <>
      {children}
      <View className="h-10" />
    </>
  );
}
