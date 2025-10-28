import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1>Hola, {user?.user?.username || user?.email}!</h1>
      <p>Tu rol: {user?.role || "Usuario"}</p>
      <button onClick={handleLogoutClick}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;

