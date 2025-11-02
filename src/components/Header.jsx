import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import ConfirmationModal from "./ConfirmationModal";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const handleLogoutConfirm = async () => {
    await logout();
    setIsLogoutConfirmOpen(false);
  };

  return (
    <>
      <header className="bg-white p-4 border-b border-[#cfd8c1] flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#1f2d1c]">BarTrack</h1>
        {isAuthenticated && (
          <button
            onClick={() => setIsLogoutConfirmOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7a8770] rounded-md border border-transparent hover:border-[#cfd8c1] hover:bg-gray-100 hover:text-[#1f2d1c] transition-all duration-200"
          >
            <LogOut size={16} />
            <span>Cerrar sesión</span>
          </button>
        )}
      </header>
      <ConfirmationModal
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Confirmar Cierre de Sesión"
        message="¿Estás seguro de que quieres cerrar la sesión?"
        confirmText="Cerrar Sesión"
        confirmButtonClass="bg-[#ef4444] hover:bg-red-700 text-white"
        icon={<LogOut className="h-6 w-6 text-[#ef4444]" />}
      />
    </>
  );
};

export default Header;
