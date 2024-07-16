import { View } from "react-native";

export default function Card({ additionalStyles, children }) {
  return (
    <View
      className={`${additionalStyles} shadow-sm shadow-black rounded-md m-1 bg-white border border-border`}
    >
      {children}
    </View>
  );
}
