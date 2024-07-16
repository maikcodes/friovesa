import { API, API_KEY } from "../constants/wordpress";
import { ERROR_SIGN_UP } from "../constants/errorMessages";
import { UserDataManager } from "../lib/UserDataManager";

export class Auth {
  static async signUp({ username, name, lastName, email, password }) {
    const response = await fetch(API.AUTH_SIGNUP.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify({
        username,
        first_name: name,
        last_name: lastName,
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      const errorCode = responseJson?.message;
      if (errorCode in ERROR_SIGN_UP) throw new Error(ERROR_SIGN_UP[errorCode]);

      throw new Error(ERROR_SIGN_UP?.unknown_error);
    }

    if (responseJson?.message !== "customer_created_successfully") {
      throw new Error(ERROR_SIGN_UP?.unknown_error);
    }

    return responseJson?.success === true;
  }

  static async loginWithUsernameAndPassword({ username, password }) {
    const response = await fetch(API.AUTH_LOGIN.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    try {
      const responseJson = await response.json();
      const userData = this.formatUserData(responseJson);

      await UserDataManager.save(userData);
    } catch (error) {
      throw new Error("Failed to save user data after login");
    }
  }

  static async logout() {
    await UserDataManager.deleteData();
  }

  static async isLoggedIn() {
    const token = await UserDataManager.getAccessToken();
    return !!token;
  }

  static formatUserData(data) {
    return {
      accessToken: data?.token,
      id: data?.store_id,
      username: data?.user_display_name || data?.user_nicename,
      email: data?.user_email,
    };
  }
}
