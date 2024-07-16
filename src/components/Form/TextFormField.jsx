import { useState } from "react";
import { View, Text, TextInput } from "react-native";

export default function TextFormField({
  title,
  placeholder,
  value,
  handleChangeText,
}) {
  const [isActive, setIsActive] = useState(false);

  const handleActive = () => setIsActive(true);

  return (
    <View className="space-y-1">
      {title && (
        <Text
          className={`px-1 text-base ${
            isActive ? "text-secondary" : "text-gray-600"
          }`}
        >
          {title}
        </Text>
      )}
      <TextInput
        multiline={true}
        numberOfLines={2}
        maxLength={200}
        placeholder={placeholder}
        onFocus={handleActive}
        onBlur={() => setIsActive(false)}
        value={value}
        onChangeText={handleChangeText}
        className="p-1 border-2 border-border focus:border-green-600 text-base rounded-md"
      />
    </View>
  );
}
