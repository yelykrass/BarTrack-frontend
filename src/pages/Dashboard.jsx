import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl Inter text-[#1f2d1c]">
          Bienvenida al Dashboard
        </h2>
        <p className="text-md Inter text-[#7a8770]">
          Aquí tienes un resumen de tu actividad.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* картки, статистика, контент */}
      </div>
    </>
  );
};

export default Dashboard;
