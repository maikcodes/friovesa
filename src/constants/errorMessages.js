import lang from "../lang/es";

export const ERROR_SIGN_UP = {
  invalid_username: lang?.invalidUsername,
  invalid_email: lang?.invalidEmail,
  invalid_password: lang?.invalidPassword,
  invalid_first_name: lang?.invalidFirstName,
  invalid_last_name: lang?.invalidLastName,
  server_error: lang?.failedToRegister,
  unknown_error: lang?.failedToRegister,
  uncompleted_fields: lang?.pleaseInput,
  username_already_exists: lang?.userAlreadyExists,
  email_already_exists: lang?.emailAlreadyExists,
};

export const ORDER = {
  SHIPPING_ZONES: {
    unknown_error: lang?.failedShippingZones,
    server_error: lang?.failedShippingZones,
  },
  CREATE: {
    unknown_error: lang?.failedCreateOrder,
    server_error: lang?.failedCreateOrder,
  },
  PAYMENT_GATEWAYS: {
    unknown_error: lang?.failedPaymentMethods,
    server_error: lang?.failedPaymentMethods,
  },
};
