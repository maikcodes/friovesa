import { APP_COLORS } from "../constants/colors";
import {
  cartIcon,
  exitIcon,
  gyeIcon,
  homeIcon,
  logoIcon,
  uioIcon,
  userIcon,
} from "../constants/icons";
import { ControlButtonSuccess, ControlButtonCancel } from "./Buttons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Image, Text, View } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import CustomModal from "./CustomModal";
import lang from "../lang/es";
import useAuth from "../hooks/useAuth";

function DrawerItemWithIcon({ label, onPress, icon }) {
  return (
    <DrawerItem
      label={() => <Text className="text-foreground">{label}</Text>}
      onPress={onPress}
      icon={({ size }) => (
        <Image
          source={icon}
          style={{
            width: size,
            height: size,
            tintColor: APP_COLORS.foreground,
          }}
        />
      )}
    />
  );
}

export default function CustomDrawerMenu(props) {
  const navigation = props?.navigation;
  const { onLogout } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handleNavigate = (path) => {
    if (!navigation || typeof navigation.navigate !== "function") {
      return;
    }

    try {
      navigation.navigate(path);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await onLogout();
    router.replace("(auth)/login");
  };

  const handleCloseLogoutModal = () => {
    setOpenModal(false);
  };

  const handleOpenLogoutModal = () => {
    setOpenModal(true);
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{
        backgroundColor: APP_COLORS.primary,
      }}
    >
      <View className="w-full h-5" />
      <View className="px-4">
        <Image source={logoIcon} style={{ width: 140, height: 30 }} />
      </View>
      <View className="w-full h-5" />

      <DrawerItemWithIcon
        label={lang.home}
        onPress={() => handleNavigate("home")}
        icon={homeIcon}
      />

      <DrawerItemWithIcon
        label={lang.cart}
        onPress={() => handleNavigate("Cart")}
        icon={cartIcon}
      />

      <DrawerItemWithIcon
        label={lang.settings}
        onPress={() => handleNavigate("Settings")}
        icon={userIcon}
      />

      <DrawerItemWithIcon
        label={lang.logout}
        onPress={handleOpenLogoutModal}
        icon={exitIcon}
      />

      <View className="mx-4 pt-4 pb-2">
        <Text className="text-foreground border-b border-gray-100 pb-1 uppercase">
          {lang.cities}
        </Text>
      </View>

      <DrawerItemWithIcon
        label={lang.uioCity}
        onPress={() => handleNavigate("Uio")}
        icon={uioIcon}
      />

      <DrawerItemWithIcon
        label={lang.gyeCity}
        onPress={() => handleNavigate("Gye")}
        icon={gyeIcon}
      />

      <CustomModal isOpen={openModal} handleClose={handleCloseLogoutModal}>
        <View className="bg-white w-11/12 p-4 rounded-md">
          <View className="py-2 mb-4 space-y-5">
            <Text className="text-lg font-bold">{lang?.areYouSureLogout}</Text>
          </View>

          <View className="space-y-2">
            <View>
              <ControlButtonSuccess
                title={lang?.logout}
                handlePress={handleLogout}
              />
            </View>

            <View>
              <ControlButtonCancel
                title={lang?.cancel}
                handlePress={handleCloseLogoutModal}
              />
            </View>
          </View>
        </View>
      </CustomModal>
    </DrawerContentScrollView>
  );
}
