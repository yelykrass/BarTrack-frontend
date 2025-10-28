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
      const authHeader = `Basic ${btoa(`${credentials.email}:${credentials.password}`)}`;

      const response = await axios.get(
        `${this.baseUri}/login`,
        {
          headers: {
            Authorization: authHeader,
          },
          withCredentials: true, // щоб сесійне кукі працювало
        }
      );

      const user = response.data.user || response.data;

      // Зберігаємо Basic Auth у sessionStorage для RequireAuth
      sessionStorage.setItem("basicAuth", authHeader);

      return {
        auth: authHeader,
        user,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.error || "Error al iniciar sesión");
    }
  }
}
