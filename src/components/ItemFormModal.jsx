import React, { useState, useEffect } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useAuth } from "../hooks/useAuth";

const ItemFormModal = ({ isOpen, onClose, onSave, item }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
    price: 0,
    expiryDate: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        expiryDate: item.expiryDate,
      });
    } else {
      setFormData({
        name: "",
        category: "",
        quantity: 0,
        price: 0,
        expiryDate: "",
      });
    }
  }, [item]);

  const handleChange = (field, value) => {
    if (field === "price") value = parseFloat(value) || 0;
    if (field === "quantity") value = parseInt(value) || 0;

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 flex flex-col">
        <h3 className="text-lg font-semibold text-[#1f2d1c] mb-4">
          {item ? "Editar Item" : "Nuevo Item"}
        </h3>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {isAdmin && (
            <>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Categoría"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="number"
                placeholder="Precio"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="border p-2 rounded-lg"
                required
              />
            </>
          )}

          <input
            type="number"
            placeholder="Cantidad"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="border p-2 rounded-lg"
            required
          />

          <input
            type="date"
            placeholder="Fecha de expiración"
            value={formData.expiryDate}
            onChange={(e) => handleChange("expiryDate", e.target.value)}
            className="border p-2 rounded-lg"
            required
          />

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#5e7350] hover:bg-[#4c5e41] text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemFormModal;
