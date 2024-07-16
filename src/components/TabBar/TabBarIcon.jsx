import { Image, View } from "react-native";

export default function TabBarIcon({ icon, color }) {
  return (
    <View>
      <Image
        source={icon}
        style={{ width: 25, height: 25, tintColor: color }}
      />
    </View>
  );
}
