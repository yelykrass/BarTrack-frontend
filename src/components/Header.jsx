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
      <header className="bg-white border-b border-[#cfd8c1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <h1 className="text-lg font-semibold text-[#1f2d1c]">BarTrack</h1>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setIsLogoutConfirmOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#7a8770] rounded-md hover:text-[#1f2d1c] focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <LogOut size={18} />
                <span>Cerrar sesión</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <ConfirmationModal
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Confirmar Cierre de Sesión"
        message="¿Estás seguro de que quieres cerrar la sesión?"
        confirmText="Cerrar Sesión"
        confirmButtonClass="bg-[#ef4444] hover:bg-red-700"
        icon={<LogOut className="h-6 w-6 text-[#ef4444]" />}
      />
    </>
  );
};

export default Header;
