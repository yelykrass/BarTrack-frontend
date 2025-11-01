import React from "react";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="dashboard">
      <h1>Hola, {user?.user?.username || user?.email}!</h1>
      <p>Tu rol: {user?.role || "Usuario"}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
