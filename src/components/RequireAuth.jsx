import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * @param {React.ReactNode} children - компонент, який треба показати
 * @param {string[]} allowedRoles - масив ролей, які мають доступ
 */
const RequireAuth = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (isAuthenticated === null) return <div>Loading...</div>;

  // Якщо не залогінений
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Якщо роль користувача не дозволена
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RequireAuth;
