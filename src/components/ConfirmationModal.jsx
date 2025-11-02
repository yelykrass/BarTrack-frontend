import { AlertTriangle } from "lucide-react";
import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  confirmButtonClass = "bg-[#ef4444] hover:bg-red-700",
  icon = <AlertTriangle className="h-6 w-6 text-[#ef4444]" />,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="
          bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 overflow-hidden
          flex flex-col
        "
      >
        {/* Контент з великим падінгом */}
        <div className="flex flex-col items-center text-center px-8 py-12">
          {/* Іконка */}
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            {icon}
          </div>

          {/* Заголовок */}
          <h3 className="text-lg font-semibold text-[#1f2d1c] mb-3">{title}</h3>

          {/* Повідомлення */}
          <p className="text-sm text-[#7a8770] mb-10 leading-relaxed">
            {message}
          </p>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 text-base font-medium text-[#1f2d1c] bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-6 py-3 text-base font-medium text-white rounded-xl transition-all ${confirmButtonClass}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
