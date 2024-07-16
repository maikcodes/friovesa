export const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const API_KEY = process.env.EXPO_PUBLIC_MOBILE_API_KEY;

export const CONSUMER_KEY = process.env.EXPO_PUBLIC_CONSUMER_KEY;
export const CONSUMER_SECRET = process.env.EXPO_PUBLIC_CONSUMER_SECRET;

export const API = {
  PRODUCTS: {
    URL: `${API_URL}/wp-json/wc/v3/products`,
    RESULTS_PER_PAGE: 10,
    RELATED_RESULTS_PER_PAGE: 20,
  },
  CATEGORIES: {
    URL: `${API_URL}/wp-json/wc/v3/products/categories`,
    RESULTS_PER_PAGE: 100,
  },
  AUTH_LOGIN: {
    URL: `${API_URL}/wp-json/jwt-auth/v1/token`,
  },
  AUTH_SIGNUP: {
    URL: `${API_URL}/wp-json/mobile/v1/signup`,
  },
  SHIPPING_ZONES: {
    URL: `${API_URL}/wp-json/mobile/v1/shipping_zones`,
  },
  ORDERS: {
    URL: `${API_URL}/wp-json/mobile/v1/create_order`,
  },
  CUSTOMER_ORDERS: {
    URL: `${API_URL}/wp-json/wc/v3/orders`,
    RESULTS_PER_PAGE: 10,
  },
  PAYMENT_GATEWAYS: {
    BACS: {
      URL: `${API_URL}/wp-json/mobile/v1/payment/bacs_info`,
    },
  },
};

export const UIO_CATEGORY_ID = 135;
export const GYE_CATEGORY_ID = 134;

// To avoid displaying specific categories in the category list
// 103: "Canasta Frutas y Verduras"
export const BLOCKED_CATEGORY_IDS = [103];

export const DEFAULT_STOCK_QUANTITY = 10;
export const MIN_CART_PRODUCTS_QUANTITY = 3;

export const BUSINESS_TYPES = ["Persona Natural", "Empresa"];
export const DOCUMENT_TYPES = [
  "Cédula de identidad",
  "RUC",
  "Pasaporte",
  "ID del exterior",
];

export const ORDER_STATUS = {
  pending: "Pendiente",
  processing: "En proceso",
  "on-hold": "En espera",
  completed: "Completado",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
  failed: "Fallido",
  trash: "Basura",
};
