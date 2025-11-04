import { useEffect, useState, useMemo, useCallback } from "react";
import AuthRepository from "./AuthRepository";
import { AuthContext } from "../context/AuthContext";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const authRepo = useMemo(() => new AuthRepository(), []);
  const checkAuth = useCheckAuth();

  const login = useCallback(
    async (email, password) => {
      const result = await authRepo.login({ email, password });
      if (result.auth) {
        setIsAuthenticated(true);
        setUser(result.user);
        setRedirectTo("/dashboard");
      } else setIsAuthenticated(false);
      return result;
    },
    [authRepo]
  );

  const logout = useCallback(async () => {
    await authRepo.logout();
    setIsAuthenticated(false);
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();
    setRedirectTo("/");
  }, [authRepo]);

  useEffect(() => {
    const syncSession = async () => {
      const response = await checkAuth();
      setIsAuthenticated(response.auth);
      setUser(response.user || null);
    };
    syncSession();
  }, [checkAuth]);

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener("unauthorized", handleUnauthorized);
    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, [logout]);

  // ⏱ автоматичне перевіряння сесії
  useEffect(() => {
    if (!isAuthenticated) return;
    const id = setInterval(async () => {
      const r = await checkAuth();
      if (!r.auth) logout();
    }, 30000);
    return () => clearInterval(id);
  }, [isAuthenticated, checkAuth, logout]);

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
