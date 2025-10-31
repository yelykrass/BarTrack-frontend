import React from "react";

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <h1>Hola, {user?.user?.username || user?.email}!</h1>
      <p>Tu rol: {user?.role || "Usuario"}</p>
      <button>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
