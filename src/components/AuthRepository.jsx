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

      if (response.status === 202 || response.status === 200) {
        return { auth: true, user: response.data.user || null };
      } else {
        return { auth: false };
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        throw new Error("Email o contraseña incorrectos");
      } else if (!error.response) {
        throw new Error("Error al conectarse al servidor");
      }
      throw new Error("Error al iniciar sesión");
    }
  }
  // async logout() {
  //   try {
  //     await axios.get(`${this.baseUri}/logout`, { withCredentials: true });
  //   } catch (error) {
  //     console.warn("Logout request failed:", error);
  //     if (!error.response) {
  //       throw new Error("Error al conectarse al servidor");
  //     }
  //     throw new Error("Error al cerrar sesión");
  //   }
  // }
  async logout() {
    // "М'який" logout — нічого на бек не відправляємо
    return true; // просто повертаємо true, щоб AuthProvider міг працювати
  }

  async checkSession() {
    try {
      const response = await axios.get(`${this.baseUri}/check-session`, {
        withCredentials: true,
      });
      return response.data; // { auth: true/false, user }
    } catch (error) {
      console.warn("Check session failed:", error);
      if (error.response?.status === 401) {
        return { auth: false, user: null, message: "La sesión ha terminado." };
      } else if (!error.response) {
        return {
          auth: false,
          user: null,
          message: "Error al conectarse al servidor",
        };
      }
      return {
        auth: false,
        user: null,
        message: "Error al verificar la sesión",
      };
    }
  }
}
