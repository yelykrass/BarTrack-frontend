import { useEffect, useState, useMemo } from "react";
import AuthRepository from "./AuthRepository";
import { AuthContext } from "../context/AuthContext";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const checkAuth = useCheckAuth();
  const authRepo = useMemo(() => new AuthRepository(), []);

  useEffect(() => {
    const fetchAuth = async () => {
      const response = await checkAuth();
      setIsAuthenticated(response.auth);
      setUser(response.user || null);
      if (response.auth) {
        setRedirectTo("/dashboard");
      }
    };
    fetchAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const result = await authRepo.login({ email, password });
    if (result?.auth) {
      setIsAuthenticated(true);
      setUser(result.user);
      setRedirectTo("/dashboard");
    } else {
      setIsAuthenticated(false);
    }
    return result;
  };

  const logout = async () => {
    await authRepo.logout();
    setIsAuthenticated(false);
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();
    setRedirectTo("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        redirectTo,
        setRedirectTo,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
