import { AUTH_TOKEN_KEY, USER_KEYS } from "../constants/secureStoreKeys";
import { SecureStore } from "../services/SecureStore";

export class UserDataManager {
  /**
   * Save user data to secure store
   * @param {Object} userData
   * @param {string} userData.accessToken
   * @param {string} userData.username
   * @param {string} userData.email
   * @param {string} userData.id
   */
  static async save({ accessToken, username, email, id }) {
    await Promise.all([
      await SecureStore.save(AUTH_TOKEN_KEY, accessToken.toString()),
      await SecureStore.save(USER_KEYS.USERNAME, username),
      await SecureStore.save(USER_KEYS.EMAIL, email),
      await SecureStore.save(USER_KEYS.ID, id.toString()),
    ]);
  }

  static async getAccessToken() {
    return SecureStore.getValueByKey(AUTH_TOKEN_KEY);
  }

  static async getData() {
    const [username, email, id] = await Promise.all([
      SecureStore.getValueByKey(USER_KEYS.USERNAME),
      SecureStore.getValueByKey(USER_KEYS.EMAIL),
      SecureStore.getValueByKey(USER_KEYS.ID),
    ]);
    return { username, email, id };
  }
  
  static async deleteData() {
    await Promise.all([
      SecureStore.delete(AUTH_TOKEN_KEY),
      SecureStore.delete(USER_KEYS.USERNAME),
      SecureStore.delete(USER_KEYS.EMAIL),
      SecureStore.delete(USER_KEYS.ID),
    ]);
  }
}
