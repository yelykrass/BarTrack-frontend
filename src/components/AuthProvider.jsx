import { useState } from "react";
import AuthRepository from "./AuthRepository";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const authRepo = new AuthRepository();

  const login = async (email, password) => {
    const result = await authRepo.login({ email, password });
    if (result?.auth) {
      setIsAuthenticated(true);
      setRedirectTo("/dashboard");
    }
    return result;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRedirectTo("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, redirectTo, setRedirectTo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
