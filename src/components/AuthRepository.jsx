import BaseRepository from "./BaseRepository";

export default class AuthRepository extends BaseRepository {
  async login({ email, password }) {
    try {
      const res = await this.api.get("/login", {
        auth: { username: email, password },
      });
      return { auth: true, user: res.data.user || null };
    } catch (err) {
      if (err.response?.status === 401)
        throw new Error("Email o contraseña incorrectos");
      throw new Error("Error de conexión");
    }
  }

  async logout() {
    try {
      await this.api.post("/logout");
      return true;
    } catch {
      return false;
    }
  }

  async checkSession() {
    try {
      const res = await this.api.get("/check-session");
      return res.data;
    } catch {
      return { auth: false, user: null };
    }
  }
}
