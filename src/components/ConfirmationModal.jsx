import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmButtonClass,
  icon,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center border border-[#cfd8c1]">
        <div className="flex flex-col items-center gap-2 mb-4">
          {icon}
          <h2 className="text-lg font-semibold text-[#1f2d1c]">{title}</h2>
          <p className="text-sm text-[#7a8770]">{message}</p>
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 text-[#1f2d1c] hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md font-medium ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
