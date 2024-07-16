import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActionButton } from "../../src/components";
import { APP_COLORS } from "../../src/constants/colors";
import { appIcon, appleIcon, googleIcon } from "../../src/constants/icons";
import { Auth } from "../../src/services/Auth";
import { errorToast } from "../../src/lib/Toast";
import { FormField, FormFieldSecure } from "../../src/components/Form";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import lang from "../../src/lang/es";
import useAuth from "../../src/hooks/useAuth";

export default function Login() {
  const { onLogin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLoginWithEmailAndPassword = async () => {
    if (form.email.trim() === "" || form.password.trim() === "") {
      errorToast({
        title: lang?.pleaseInput,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await Auth.loginWithUsernameAndPassword({
        username: form.email,
        password: form.password,
      });

      const isLoggedIn = await Auth.isLoggedIn();
      if (!isLoggedIn) throw new Error("Failed to login");

      onLogin();
      router.replace("/home");
    } catch (error) {
      errorToast({
        title: lang?.usernameOrPasswordInvalid,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-background h-full px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View className="mt-7"> */}
        <View className="mt-20">
          <Image
            source={appIcon}
            className="w-52 h-52 mx-auto"
            style={{ tintColor: APP_COLORS.primary }}
          />
        </View>

        <View className="w-full flex flex-col">
          <View className="mb-4">
            <FormField
              title={lang.username}
              placeholder={lang.enterYourEmailOrUsername}
              value={form.email}
              handleChangeText={(event) => setForm({ ...form, email: event })}
            />
          </View>

          <View className="mb-4">
            <FormFieldSecure
              title={lang.password}
              placeholder={lang.enterYourPassword}
              value={form.password}
              handleChangeText={(event) =>
                setForm({ ...form, password: event })
              }
            />
          </View>

          <View className="mb-4 mx-auto">
            {/* <Link href="/login" className="text-secondary underline text-base">
              {lang.resetPassword}
            </Link> */}
          </View>

          <View className="mb-4">
            {isSubmitting ? (
              <View className="rounded-full bg-secondary w-12 h-12 mx-auto flex flex-row justify-center items-center">
                <ActivityIndicator size="large" color={APP_COLORS.foreground} />
              </View>
            ) : (
              <ActionButton
                title={lang.signInWithEmail}
                handlePress={handleLoginWithEmailAndPassword}
              />
            )}
          </View>

          {/* <View className="flex flex-row items-center justify-center space-x-2 mb-4">
            <View className="h-[1px] mt-[2px] bg-gray-400 w-2/5" />
            <Text className="text-gray-400">{lang.or}</Text>
            <View className="h-[1px] mt-[2px] bg-gray-400 w-2/5" />
          </View>

          <View className="flex flex-row space-x-6 justify-center mb-4">
            <TouchableOpacity className="w-12 h-12 rounded-full p-2">
              <Image source={googleIcon} className="w-full h-full" />
            </TouchableOpacity>

            <TouchableOpacity className="w-12 h-12 rounded-full p-2">
              <Image source={appleIcon} className="w-full h-full" />
            </TouchableOpacity>
          </View> */}

          <View className="flex flex-row justify-center h-20">
            <Text className="text-base">{lang.dontHaveAccount} </Text>
            <Link href="/signup">
              <Text className="text-secondary text-base font-bold">
                {lang.signUp}
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
