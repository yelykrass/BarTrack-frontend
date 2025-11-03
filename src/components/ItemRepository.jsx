import axios from "axios";

export default class ItemRepository {
  constructor() {
    // Використовуємо базовий URL з .env (наприклад VITE_API_URL=https://localhost:8443/api/items)
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "",
      withCredentials: true, // важливо! щоб Spring Security бачив сесію (JSESSIONID)
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Перехоплювач відповіді — якщо 401, відправляємо подію "unauthorized"
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          window.dispatchEvent(new CustomEvent("unauthorized"));
        }
        return Promise.reject(error);
      }
    );
  }

  // Універсальний метод для запитів
  async request(method, path, data = null) {
    const config = { method, url: path };
    if (data) config.data = data;

    const response = await this.api.request(config);
    return response.data;
  }

  // === CRUD Методи ===

  getAll() {
    // GET / — отримати всі товари
    return this.request("get", "/items");
  }

  create(item) {
    // POST / — створити новий товар (тільки для ROLE_ADMIN)
    return this.request("post", "/items", item);
  }

  update(id, item) {
    // PUT /{id} — оновити товар
    return this.request("put", `/items/${id}`, item);
  }

  delete(id) {
    // DELETE /{id} — видалити товар
    return this.request("delete", `/items/${id}`);
  }
}
