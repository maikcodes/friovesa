import { ActionButton, CustomSafeAreaView } from "../../src/components";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { APP_COLORS } from "../../src/constants/colors";
import { appIcon } from "../../src/constants/icons";
import { Auth } from "../../src/services/Auth";
import { errorToast, successToast } from "../../src/lib/Toast";
import { FormField, FormFieldSecure } from "../../src/components/Form";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { validateSignUpFields } from "../../src/lib/validations";
import lang from "../../src/lang/es";
import useAuth from "../../src/hooks/useAuth";

export default function SignUp() {
  const { onLogin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    username: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    checkedPassword: "",
  });

  const handleSignUpWithEmail = async () => {
    let validatedData = {};
    try {
      validatedData = validateSignUpFields({
        username: form.username,
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        checkedPassword: form.checkedPassword,
      });
    } catch (error) {
      errorToast({
        title: error?.message,
        slow: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const isSignedUp = await Auth.signUp({
        username: validatedData.username,
        name: validatedData.name,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: validatedData.password,
      });

      if (isSignedUp) {
        successToast({
          title: lang?.accountCreated,
        });
      }
    } catch (error) {
      errorToast({
        title: error?.message,
        slow: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await Auth.loginWithUsernameAndPassword({
        username: validatedData.username,
        password: validatedData.password,
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
        <View>
          <Image
            source={appIcon}
            className="w-40 h-40 mx-auto"
            style={{ tintColor: APP_COLORS.primary }}
          />
        </View>

        <View className="w-full flex flex-col">
          <View className="mb-4">
            <FormField
              title={lang?.username}
              placeholder={lang?.enterYourUsername}
              value={form.username}
              handleChangeText={(event) =>
                setForm({ ...form, username: event })
              }
            />
          </View>

          <View className="mb-4">
            <FormField
              title={lang?.name}
              placeholder={lang?.enterYourFirstName}
              value={form.name}
              handleChangeText={(event) => setForm({ ...form, name: event })}
            />
          </View>

          <View className="mb-4">
            <FormField
              title={lang?.lastName}
              placeholder={lang?.enterYourLastName}
              value={form.lastName}
              handleChangeText={(event) =>
                setForm({ ...form, lastName: event })
              }
            />
          </View>

          <View className="mb-4">
            <FormField
              title={lang?.email}
              placeholder={lang?.enterYourEmail}
              value={form.email}
              handleChangeText={(event) => setForm({ ...form, email: event })}
            />
          </View>

          <View className="mb-4">
            <FormFieldSecure
              title={lang?.password}
              placeholder={lang?.enterYourPassword}
              value={form.password}
              handleChangeText={(event) =>
                setForm({ ...form, password: event })
              }
            />
          </View>

          <View className="mb-4">
            <FormFieldSecure
              title={lang?.checkYourPassword}
              placeholder={lang?.checkYourPassword}
              value={form.checkedPassword}
              handleChangeText={(event) =>
                setForm({ ...form, checkedPassword: event })
              }
            />
          </View>
        </View>

        <View className="mb-4 flex flex-row justify-center">
          <Text className="text-base">{lang?.bySignup} </Text>
          <Link href="/policy">
            <Text className="text-secondary text-base underline">
              {lang?.agreeWithPrivacy}
            </Text>
          </Link>
        </View>

        <View className="mb-4">
          {isSubmitting ? (
            <View className="rounded-full bg-secondary w-12 h-12 mx-auto flex flex-row justify-center items-center">
              <ActivityIndicator size="large" color={APP_COLORS.foreground} />
            </View>
          ) : (
            <ActionButton
              title={lang?.createAnAccount}
              handlePress={handleSignUpWithEmail}
            />
          )}
        </View>

        <View className="flex flex-row justify-center h-20">
          <Text className="text-base">{lang?.or} </Text>
          <Link href="/login">
            <Text className="text-secondary text-base underline">
              {lang?.loginToYourAccount}
            </Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
