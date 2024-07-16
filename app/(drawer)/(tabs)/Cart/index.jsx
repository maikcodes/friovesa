import { CartProduct } from "../../../../src/components/Cart";
import {
  ControlButtonCancel,
  ControlButtonSuccess,
} from "../../../../src/components/Buttons";
import { CustomSafeAreaView } from "../../../../src/components";
import { FlatList } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import { memo, useState } from "react";
import { MIN_CART_PRODUCTS_QUANTITY } from "../../../../src/constants/wordpress";
import { View, Text, Pressable } from "react-native";
import CustomModal from "../../../../src/components/CustomModal";
import lang from "../../../../src/lang/es";
import useCart from "../../../../src/hooks/useCart";

function Cart() {
  const { cart, itemsCount, total, setQuantity, clearCart, removeFromCart } =
    useCart();
  const [openModal, setOpenModal] = useState(false);

  const hasTheMinimumQuantity = itemsCount >= MIN_CART_PRODUCTS_QUANTITY;

  const handleCheckout = () => {
    router.push("Cart/checkout");
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleConfirmClearCart = () => {
    setOpenModal(true);
  };

  const handleClearCart = () => {
    clearCart();
    setOpenModal(false);
  };

  return (
    <CustomSafeAreaView>
      <View className="flex flex-row justify-between p-2">
        <View className="w-4/12 my-auto">
          <Text className="text-xl">{lang.myCart}</Text>
        </View>

        <View className="w-6/12">
          <ControlButtonSuccess
            title={lang.checkout}
            handlePress={handleCheckout}
            disabled={!hasTheMinimumQuantity}
          />
        </View>
      </View>

      {itemsCount === 0 ? (
        <View className="flex flex-col items-center justify-center pt-40">
          <View className="flex flex-col items-center">
            <Text className="text-lg font-bold">{lang.cartIsEmpty}</Text>

            <Text className="text-center text-base px-6">
              {lang.cartIsEmptyDescription}
            </Text>
          </View>

          <View className="flex flex-row items-center space-x-4 pt-4">
            <Link className="text-secondary text-base py-2 px-4" href="/Uio">
              {lang.uioCity}
            </Link>
            <Link className="text-secondary text-base py-2 px-4" href="/Gye">
              {lang.gyeCity}
            </Link>
          </View>
        </View>
      ) : (
        <View className="py-1">
          <FlatList
            style={{ marginBottom: 60 }}
            data={cart}
            renderItem={({ item }) => (
              <View>
                <CartProduct
                  product={item}
                  handleSetQuantity={setQuantity}
                  handleRemoveFromCart={removeFromCart}
                />
                <View className="h-[1px] bg-gray-100 mt-2 mb-4" />
              </View>
            )}
            keyExtractor={(item) => item?.id?.toString()}
            ListHeaderComponent={
              <>
                <View className="flex flex-row mb-4 justify-between px-2">
                  <View className="flex flex-row items-center">
                    <Text className="text-secondary uppercase">
                      {lang.total}:{" "}
                    </Text>

                    <Text className="text-secondary lowercase">
                      {itemsCount} {lang.items}
                    </Text>
                  </View>

                  <Pressable onPress={handleConfirmClearCart}>
                    <Text className="text-out-of-stock uppercase">
                      {lang.clearCart}
                    </Text>
                  </Pressable>
                </View>

                <View className="h-[1px] bg-gray-200 mb-4" />

                <CustomModal isOpen={openModal} handleClose={handleCancel}>
                  <View className="bg-white w-11/12 p-4 rounded-md">
                    <View className="py-2 mb-4 space-y-5">
                      <Text className="text-lg font-bold">
                        {lang?.areYouSureClearCart}
                      </Text>
                    </View>

                    <View className="space-y-2">
                      <View>
                        <ControlButtonSuccess
                          title={lang?.clearCart}
                          handlePress={handleClearCart}
                        />
                      </View>

                      <View>
                        <ControlButtonCancel
                          title={lang?.cancel}
                          handlePress={handleCancel}
                        />
                      </View>
                    </View>
                  </View>
                </CustomModal>
              </>
            }
            ListFooterComponent={
              <View className="w-full px-2">
                {/* <View className="mb-4 flex flex-row justify-between items-center h-10">
                  <View className="w-6/12">
                    <FormField placeholder={lang.couponCode} />
                  </View>

                  <View className="w-5/12">
                    <TouchableOpacity className="bg-gray-200 w-full h-full text-center flex flex-row items-center justify-center space-x-1 rounded-md">
                      <Image
                        className="w-6 h-6"
                        source={checkIcon}
                        style={{
                          tintColor: APP_COLORS.secondary,
                        }}
                      />
  
                      <Text className="text-center text-secondary">
                        {lang.apply}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View> */}

                <View className="mb-4 bg-gray-200 space-y-2 p-2">
                  <View className="w-full flex flex-row justify-between">
                    <Text className="text-copy-lighter text-base">
                      {lang.items}
                    </Text>

                    <Text className="text-copy-lighter text-base">
                      x{itemsCount}
                    </Text>
                  </View>

                  <View className="w-full flex flex-wrap flex-row justify-between">
                    <Text className="text-copy-light text-xl font-bold">
                      {lang.total}:
                    </Text>

                    <Text className="text-copy-light text-xl font-bold">
                      {total}
                    </Text>
                  </View>
                </View>
              </View>
            }
          />
        </View>
      )}
    </CustomSafeAreaView>
  );
}

export default memo(Cart);
