import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl Inter text-[#1f2d1c]">
            Bienvenida al Dashboard
          </h2>
          <p className="text-md Inter text-[#7a8770]">
            Aquí tienes un resumen de tu actividad.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* контент */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
