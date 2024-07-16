import { API, API_KEY } from "../constants/wordpress";
import { convertToMoney, removeHtmlTags } from "../lib/utils";
import { ORDER } from "../constants/errorMessages";
import { Order } from "./Order";
import lang from "../lang/es";

export class Checkout {
  static async getShippingZones() {
    try {
      const response = await fetch(API.SHIPPING_ZONES.URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
      });

      const responseJson = await response.json();

      if (!response.ok) {
        const errorCode = responseJson?.message;
        if (errorCode in ORDER.SHIPPING_ZONES)
          throw new Error(ORDER.SHIPPING_ZONES[errorCode]);

        throw new Error(ORDER.SHIPPING_ZONES?.unknown_error);
      }

      const shippingZones = this.formatShippingZones(responseJson?.zones);
      return shippingZones;
    } catch (error) {
      console.log("🚀 ~ Checkout ~ getShippingZones ~ error:", error);
      throw new Error(ORDER.SHIPPING_ZONES?.unknown_error);
    }
  }

  static formatShippingZones(shippingZones) {
    return shippingZones.map((zone) => {
      const costPerOrder = convertToMoney(zone?.const_per_order);

      return {
        id: zone?.id,
        instanceId: zone?.instance_id,
        title: zone?.title,
        order: zone?.order,
        description: zone?.description,
        costPerOrder: costPerOrder,
        methodId: zone?.method_id,
      };
    });
  }

  static getPaymentMethods() {
    const rawPaymentMethods = [
      {
        id: "bacs",
        title: "Transferencia directa",
        description:
          'Al momento de realizar tu transferencia por favor no olvides enviar tu comprobante a <strong>info@friovesa.com</strong> o por WhatsApp a los números:\r\n\r\n<div class="typdata">UIO -  099 294 1657</div>\r\n<div class="typdata">GYE -  099 665 3844</div>',
        order: 0,
        enabled: true,
        method_title: "Transferencia bancaria directa",
      },
    ];

    const paymentMethods = this.formatPaymentMethods(rawPaymentMethods);
    return paymentMethods;
  }

  static async getPaymentGateways() {
    try {
      const response = await fetch(API.PAYMENT_GATEWAYS.BACS.URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
      });

      const responseJson = await response.json();

      if (!response.ok) {
        const errorCode = responseJson?.message;
        if (errorCode in ORDER.PAYMENT_GATEWAYS)
          throw new Error(ORDER.PAYMENT_GATEWAYS[errorCode]);

        throw new Error(ORDER.PAYMENT_GATEWAYS?.unknown_error);
      }

      return this.formatPaymentGateway(responseJson?.payment_info);
    } catch (error) {
      console.log("🚀 ~ Checkout ~ getPaymentGateways ~ error:", error);
      throw new Error(ORDER.PAYMENT_GATEWAYS?.unknown_error);
    }
  }

  static formatPaymentMethods(paymentMethods) {
    return paymentMethods.map((method) => {
      const description = removeHtmlTags(method?.description);

      return {
        id: method?.id,
        title: method?.title,
        description: description,
        order: method?.order,
        enabled: method?.enabled,
        methodTitle: method?.method_title,
      };
    });
  }

  static async createOrder({
    shippingZone,
    paymentMethod,
    address,
    cart,
    customerId,
  }) {
    try {
      const formattedOrder = this.formatOrderToCreate({
        shippingZone,
        paymentMethod,
        address,
        cart,
        customerId,
      });

      const response = await fetch(API.ORDERS.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
        body: JSON.stringify(formattedOrder),
      });

      const responseJson = await response.json();

      if (!response.ok) {
        const errorCode = responseJson?.message;
        if (errorCode in ORDER.CREATE) throw new Error(ORDER.CREATE[errorCode]);

        throw new Error(ORDER.CREATE?.unknown_error);
      }

      const order = new Order();
      return order.formatOrder(responseJson?.message);
    } catch (error) {
      console.log("🚀 ~ Checkout ~ error:", error);
      throw new Error(ORDER.CREATE?.unknown_error);
    }
  }

  static formatOrderToCreate({
    shippingZone,
    paymentMethod,
    address,
    cart,
    customerId,
  }) {
    const additionalNotes = `
      ${lang.businessType}: ${address?.businessType}
      ${lang.documentType}: ${address?.documentType}
      ${lang.identification}: ${address?.identification}
      ${lang.addressLatitude}: ${address?.addressLatitude}
      ${lang.addressLongitude}: ${address?.addressLongitude}
      ${lang.additionalNotes}: ${address?.additionalNotes}
    `;

    const lineItems = cart.map((item) => ({
      product_id: item?.id,
      quantity: item?.quantity,
    }));

    return {
      origin: "mobile",
      payment_method: paymentMethod?.id,
      payment_method_title: paymentMethod?.title,
      customer_id: customerId,
      customer_note: additionalNotes,
      billing: {
        first_name: address?.name,
        last_name: address?.lastName,
        company: "",
        address_1: address?.address,
        address_2: address?.addressStreet,
        city: "",
        postcode: "",
        country: "EC",
        state: "",
        email: address?.email,
        phone: address?.phone,
      },
      shipping: {
        first_name: address?.name,
        last_name: address?.lastName,
        company: "company name",
        address_1: address?.address,
        address_2: address?.addressStreet,
        city: "",
        state: "",
        postcode: "",
        country: "EC",
        email: address?.email,
        phone: address?.phone,
      },
      line_items: lineItems,
      shipping_lines: [
        {
          method_id: shippingZone?.methodId,
          method_title: shippingZone?.title,
          total: shippingZone?.costPerOrder.slice(1),
        },
      ],
    };
  }

  static formatPaymentGateway(paymentGateways) {
    return {
      accountName: paymentGateways.account_name,
      bankName: paymentGateways.bank_name,
      accountNumber: paymentGateways.account_number,
      classificationCode: paymentGateways.classification_code,
      iban: paymentGateways.iban,
      instructions: paymentGateways.instructions,
    };
  }
}
