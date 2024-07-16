import { useState } from "react";
import { View, Text, TextInput } from "react-native";

export default function FormField({
  title,
  placeholder,
  value,
  handleChangeText,
  mark = false,
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
        placeholder={placeholder}
        onFocus={handleActive}
        onBlur={() => setIsActive(false)}
        value={value}
        onChangeText={handleChangeText}
        className={`px-1 border-2 border-x-0 border-t-0 border-border focus:border-green-600 text-base ${
          mark ? "border-error-content" : "border-border"
        }`}
      />
    </View>
  );
}
