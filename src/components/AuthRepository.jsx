import axios from "axios";

export default class AuthRepository {
  constructor() {
    this.baseUri = import.meta.env.VITE_API_URL || "";
  }

  /**
   * Логін користувача через Basic Auth (GET)
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{auth: string, user: Object}>}
   */
  async login(credentials) {
    try {
      const response = await axios.get(`${this.baseUri}/login`, {
        auth: {
          username: credentials.email,
          password: credentials.password,
        },
        withCredentials: true,
      });

      if (response.status === 202) {
        return { auth: true, user: response.data.user || null };
      } else {
        return { auth: false };
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.error || "Error al iniciar sesión");
    }
  }
  async logout() {
    try {
      await axios.get(`${this.baseUri}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.warn("Logout request failed:", error);
    }
  }
}
