import { APP_COLORS } from "../../../../src/constants/colors";
import { CustomSafeAreaView, ListContainer } from "../../../../src/components";
import {
  ControlButtonSuccess,
  ControlButtonCancel,
} from "../../../../src/components/Buttons";
import {
  clockIcon,
  deleteIcon,
  exitIcon,
  infoIcon,
  nextIcon,
  privacyIcon,
  profileIcon,
  starIcon,
  sunIcon,
  termsIcon,
} from "../../../../src/constants/icons";
import { router } from "expo-router";
import { TouchableSettings } from "../../../../src/components/Touchable";
import { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import CustomModal from "../../../../src/components/CustomModal";
import lang from "../../../../src/lang/es";
import useAuth from "../../../../src/hooks/useAuth";

export default function index() {
  const { onLogout, user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handleLogout = async () => {
    await onLogout();
    router.replace("(auth)/login");
  };

  const handleAboutUs = () => {
    router.push("(drawer)/(tabs)/Settings/aboutUs");
  };

  const handleTerms = () => {
    router.push("(drawer)/(tabs)/Settings/termsAndConditions");
  };

  const handleCloseLogoutModal = () => {
    setOpenModal(false);
  };

  const handleOpenLogoutModal = () => {
    setOpenModal(true);
  };

  const handleOrdersHistory = () => {
    router.push("(drawer)/(tabs)/Settings/ordersHistory");
  };

  return (
    <CustomSafeAreaView>
      <ScrollView className="px-4 py-3">
        <ListContainer>
          <View className="space-y-5">
            <View className="flex flex-row space-x-5">
              <View className="w-10 h-10 bg-copy-dark-lighter rounded-full p-2 overflow-hidden">
                <Image
                  source={profileIcon}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  tintColor={APP_COLORS.foreground}
                />
              </View>

              <View className="flex flex-col justify-center">
                <Text className="text-base ">{user?.username}</Text>
                <Text className="text-base text-slate-500">{user?.email}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={handleOpenLogoutModal}>
              <View className="flex flex-row">
                <View className="w-2/12 flex flex-row items-center">
                  <View className="w-10 h-10 p-2">
                    <Image
                      source={exitIcon}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      tintColor={APP_COLORS.copyDarkLighter}
                    />
                  </View>
                </View>

                <View className="w-10/12 pl-2">
                  <View className="flex flex-row py-1 justify-between">
                    <View className="flex flex-col justify-center ">
                      <Text className="text-base">{lang.closeSession}</Text>
                    </View>

                    <View className="w-11 h-11 p-2">
                      <Image
                        source={nextIcon}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        tintColor={APP_COLORS.copyDarkLighter}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <View className="space-y-4">
              <Text className="text-lg font-bold">{lang.generalSettings}</Text>
              <View className="space-y-1">
                {/* <TouchableSettings title={lang.theme} icon={sunIcon} /> */}
                {/* <TouchableSettings title={lang.rateOurApp} icon={starIcon} /> */}
                <TouchableSettings
                  title={lang.ordersHistory}
                  icon={clockIcon}
                  handlePress={handleOrdersHistory}
                />
                <TouchableSettings
                  title={lang.terms}
                  icon={termsIcon}
                  handlePress={handleTerms}
                />
                {/* <TouchableSettings
                title={lang.privacyPolicy}
                icon={privacyIcon}
              /> */}
                <TouchableSettings
                  title={lang.aboutUs}
                  icon={infoIcon}
                  handlePress={handleAboutUs}
                />

                {/* <TouchableSettings
                title={lang.deleteAccount}
                icon={deleteIcon}
                iconColor="#f55"
                titleColor="#f55"
                isEnd={true}
              /> */}
              </View>
            </View>
          </View>
        </ListContainer>
      </ScrollView>

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
    </CustomSafeAreaView>
  );
}
