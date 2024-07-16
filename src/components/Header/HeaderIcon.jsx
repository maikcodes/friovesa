import { View, Image } from "react-native";

export default function HeaderIcon({ icon, color }) {
  return (
    <View className="p-1">
      <Image
        source={icon}
        style={{ width: 25, height: 25, tintColor: color }}
      />
    </View>
  );
}
