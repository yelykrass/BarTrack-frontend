import { useState } from "react";
import AuthRepository from "./AuthRepository";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const authRepo = new AuthRepository();

  const login = async (email, password) => {
    const result = await authRepo.login({ email, password });
    if (result?.auth) {
      setIsAuthenticated(true);
      setUser(result.user);
      setRedirectTo("/dashboard");
    }
    return result;
  };

  const logout = async () => {
    try {
      await authRepo.logout(); // Очистити сесію на сервері
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      // очищення можливих даних у localStorage / sessionStorage:
      localStorage.clear();
      sessionStorage.clear();
      setRedirectTo("/login");
    }
  };
  // const logout = () => {
  //   setIsAuthenticated(false);
  //   setUser(null);
  //   setRedirectTo("/login");
  // };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        redirectTo,
        setRedirectTo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
