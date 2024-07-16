import { router } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Card from "../Card";
import useOderHistory from "../.../../../hooks/useOrderHistory";

export default function OrderCard({ order }) {
  const { onSelectOrderHistory } = useOderHistory();

  const { address, country, id, status, dateCreated, total, totalTax } = order;
  const date = new Date(dateCreated).toLocaleDateString("es-ec");
  const time = new Date(dateCreated).toLocaleTimeString("es-ec");
  const firstProductName = order?.products[0]?.name;
  const imageUrl = order?.products[0]?.imageUrl;
  const totalProducts = order?.products.length;

  const handleSelectOrder = () => {
    onSelectOrderHistory(order);
    router.push(`/(drawer)/(tabs)/Settings/orderHistory/${id}`);
  };

  return (
    <Card additionalStyles="p-3">
      <TouchableOpacity className="space-y-2" onPress={handleSelectOrder}>
        <View className="flex flex-row justify-between">
          <View className="w-3/12 h-20 ">
            <Image
              source={{ uri: imageUrl }}
              className="h-full w-full object-cover"
            />
          </View>

          <View className="w-8/12 flex flex-col space-y-5">
            <View className="flex flex-col space-y-1">
              <View>
                <Text className="text-base font-bold text-primary">
                  {firstProductName}
                </Text>
              </View>

              <View className="w-7/12 ">
                <Text>
                  {address} | {country}
                </Text>
              </View>
            </View>

            <View className="flex flex-row">
              <View className="w-6/12 pr-1">
                <Text className="capitalize">Fecha: {date}</Text>
                <Text className="capitalize">Hora: {time}</Text>
              </View>

              <View className="w-6/12 pl-1 items-end">
                <Text className="text-end">Pedido</Text>

                <Text className="text-base font-bold text-end"># {id}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-gray-100 flex flex-row justify-between p-1 rounded-md">
          <View className="w-3/12 flex flex-col space-y-2">
            <View className="mx-auto">
              <Text className="font-bold">Total</Text>
            </View>

            <View className="mx-auto">
              <Text>{total}</Text>
            </View>
          </View>

          <View className="w-2/12 flex flex-col space-y-2">
            <View className="mx-auto">
              <Text className="font-bold">Impuesto</Text>
            </View>

            <View className="mx-auto">
              <Text>{totalTax}</Text>
            </View>
          </View>

          <View className="w-2/12 flex flex-col space-y-2">
            <View className="mx-auto">
              <Text className="font-bold">Cantidad</Text>
            </View>

            <View className="mx-auto">
              <Text>{totalProducts}</Text>
            </View>
          </View>

          <View className="w-3/12 flex flex-col space-y-2">
            <View className="mx-auto">
              <Text className="font-bold">Estado</Text>
            </View>

            <View className="mx-auto">
              <Text className="px-2 rounded-md bg-primary text-foreground">{status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
