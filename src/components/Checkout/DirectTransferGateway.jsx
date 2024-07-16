import { View, Text } from "react-native";

export default function DirectTransferGateway({ gateway }) {
  return (
    <View className="bg-gray-200 p-4 rounded-md">
      <Text className="text-xl mb-3 font-bold">{gateway?.accountName}</Text>

      <View className="flex flex-row justify-between">
        <Text className="uppercase">Banco</Text>

        <Text className="uppercase font-bold">{gateway?.bankName}</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Text className="uppercase">Número de cuenta</Text>

        <Text className="uppercase font-bold">{gateway?.accountNumber}</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Text className="uppercase">Código de clasificación</Text>

        <Text className="uppercase font-bold">
          {gateway?.classificationCode}
        </Text>
      </View>

      <View className="flex flex-row justify-between">
        <Text className="uppercase">IBAM</Text>

        <Text className="font-bold">{gateway?.iban}</Text>
      </View>
    </View>
  );
}
