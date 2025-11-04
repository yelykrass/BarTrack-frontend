import axios from "axios";

export default class BaseRepository {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    // 🔐 Перехоплення 401
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          window.dispatchEvent(new CustomEvent("unauthorized"));
        }
        return Promise.reject(error);
      }
    );
  }

  async request(method, url, data = null) {
    const config = { method, url };
    if (data) config.data = data;
    const response = await this.api.request(config);
    return response.data;
  }
}
