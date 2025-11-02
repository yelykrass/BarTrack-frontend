import React from "react";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8f9f7]">
      <Header />
      <main className="p-4">
        <h2 className="text-lg font-semibold text-[#1f2d1c]">
          Bienvenida al Dashboard
        </h2>
      </main>
    </div>
  );
};

export default Dashboard;
