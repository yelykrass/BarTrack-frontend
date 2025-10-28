import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const basicAuth = sessionStorage.getItem("basicAuth");
  const location = useLocation();

  if (!basicAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
