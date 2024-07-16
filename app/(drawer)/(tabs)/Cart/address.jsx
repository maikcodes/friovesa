import {
  BUSINESS_TYPES,
  DOCUMENT_TYPES,
} from "../../../../src/constants/wordpress";
import { CartCheckoutNavigationButtons } from "../../../../src/components/Checkout";
import { errorToast } from "../../../../src/lib/Toast";
import { FormField, TextFormField } from "../../../../src/components/Form";
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { validateAddressFields } from "../../../../src/lib/validations/addressValidations";
import lang from "../../../../src/lang/es";
import useAuth from "../../../../src/hooks/useAuth";
import useCheckout from "../../../../src/hooks/useCheckout";

export default function Address({ handleBack, handleNext }) {
  const { user } = useAuth();
  const { address, onChangeAddress, onSaveAddress } = useCheckout();
  const [markRequired, setMarkRequired] = useState(false);
  const businessTypes = BUSINESS_TYPES;
  const documentTypes = DOCUMENT_TYPES;

  useEffect(() => {
    if (address?.email === "") {
      onChangeAddress(user?.email, "email");
    }
  }, [user?.email]);

  const handleContinue = async () => {
    setMarkRequired(true);
    try {
      validateAddressFields({
        businessType: address.businessType,
        documentType: address.documentType,
        identification: address.identification,
        name: address.name,
        lastName: address.lastName,
        address: address.address,
        addressStreet: address.addressStreet,
        sector: address.sector,
        phone: address.phone,
        email: address.email,
        addressLatitude: address.addressLatitude,
        addressLongitude: address.addressLongitude,
        additionalNotes: address.additionalNotes,
      });
    } catch (error) {
      errorToast({
        title: error?.message,
        slow: true,
      });
      return;
    }

    await onSaveAddress();
    handleNext();
  };

  const markAsRequired = (value) => {
    if (value?.trim() === "" && markRequired) return true;
    return false;
  };

  return (
    <>
      <View className="px-4 space-y-5">
        <View className="space-y-1">
          <Text className="text-base text-gray-600">{lang?.businessType}</Text>

          <View
            className={`border border-border rounded-md ${
              markAsRequired(address.businessType)
                ? "border-error-content"
                : "border-border"
            }`}
          >
            <Picker
              selectedValue={address.businessType}
              onValueChange={(itemValue) =>
                onChangeAddress(itemValue, "businessType")
              }
              style={{
                marginHorizontal: -5,
                marginVertical: -10,
              }}
            >
              {address.businessType ? null : (
                <Picker.Item label={lang?.select} value="" />
              )}

              {businessTypes?.map((businessType, index) => (
                <Picker.Item
                  label={businessType}
                  value={businessType}
                  key={index}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View className="space-y-1">
          <Text className="text-base text-gray-600">{lang?.documentType}</Text>

          <View
            className={`border border-border rounded-md ${
              markAsRequired(address.documentType)
                ? "border-error-content"
                : "border-border"
            }`}
          >
            <Picker
              selectedValue={address.documentType}
              onValueChange={(itemValue) =>
                onChangeAddress(itemValue, "documentType")
              }
              style={{
                marginHorizontal: -5,
                marginVertical: -10,
              }}
            >
              {address.documentType ? null : (
                <Picker.Item label={lang?.select} value="" />
              )}

              {documentTypes?.map((documentType, index) => (
                <Picker.Item
                  label={documentType}
                  value={documentType}
                  key={index}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View>
          <FormField
            mark={markAsRequired(address.identification)}
            title={lang?.identification}
            placeholder=""
            value={address.identification}
            handleChangeText={(event) =>
              onChangeAddress(event, "identification")
            }
          />
        </View>

        <View>
          <FormField
            mark={markAsRequired(address.name)}
            title={lang?.name}
            placeholder=""
            value={address.name}
            handleChangeText={(event) => onChangeAddress(event, "name")}
          />
        </View>

        <View>
          <FormField
            mark={markAsRequired(address.lastName)}
            title={lang?.lastName}
            placeholder=""
            value={address.lastName}
            handleChangeText={(event) => onChangeAddress(event, "lastName")}
          />
        </View>

        <View className="space-y-3">
          <View>
            <FormField
              mark={markAsRequired(address.address)}
              title={lang?.fullAddress}
              placeholder={lang?.address}
              value={address.address}
              handleChangeText={(event) => onChangeAddress(event, "address")}
            />
          </View>

          <View>
            <FormField
              title=""
              placeholder={lang?.addressPlaceholder}
              value={address.addressStreet}
              handleChangeText={(event) =>
                onChangeAddress(event, "addressStreet")
              }
            />
          </View>
        </View>

        <View>
          <FormField
            mark={markAsRequired(address.sector)}
            title={lang?.sector}
            placeholder=""
            value={address.sector}
            handleChangeText={(event) => onChangeAddress(event, "sector")}
          />
        </View>

        <View>
          <FormField
            mark={markAsRequired(address.phone)}
            title={lang?.phone}
            placeholder=""
            value={address.phone}
            handleChangeText={(event) => onChangeAddress(event, "phone")}
          />
        </View>

        <View>
          <FormField
            mark={markAsRequired(address.email)}
            title={lang?.email}
            placeholder=""
            value={address.email}
            handleChangeText={(event) => onChangeAddress(event, "email")}
          />
        </View>

        <View>
          <FormField
            title={lang?.addressLatitude}
            placeholder=""
            value={address.addressLatitude}
            handleChangeText={(event) =>
              onChangeAddress(event, "addressLatitude")
            }
          />
        </View>

        <View>
          <FormField
            title={lang?.addressLongitude}
            placeholder=""
            value={address.addressLongitude}
            handleChangeText={(event) =>
              onChangeAddress(event, "addressLongitude")
            }
          />
        </View>

        <View>
          <TextFormField
            title={lang?.optionalAdditionalNotes}
            placeholder={lang?.additionalNotesPlaceholder}
            value={address.additionalNotes}
            handleChangeText={(event) =>
              onChangeAddress(event, "additionalNotes")
            }
          />
        </View>
      </View>

      <CartCheckoutNavigationButtons
        handleBack={handleBack}
        handleNext={handleContinue}
      />
    </>
  );
}
