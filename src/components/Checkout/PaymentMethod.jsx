import { View, Text, TouchableOpacity } from "react-native";

export default function PaymentMethod({ method, isSelected }) {  
  return (
    <TouchableOpacity className="flex flex-row bg-gray-200 py-4 px-2 rounded-md">
      <View className="w-2/12 p-2 my-auto">
        <View className="w-5 h-5 border border-gray-500 p-1 rounded-full flex flex-row justify-center items-center">
          {isSelected && <View className="w-3 h-3 bg-primary rounded-full" />}
        </View>
      </View>

      <View className="w-10/12 space-y-3">
        <Text className="text-copy-light font-bold text-lg">
          {method?.title}
        </Text>
        <Text className="text-copy-light text-base">{method?.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
