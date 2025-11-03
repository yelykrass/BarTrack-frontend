import React from "react";
import ItemTable from "../components/ItemTable";
import ItemFormModal from "../components/ItemFormModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { useInventory } from "../hooks/useInventory";
import { useAuth } from "../hooks/useAuth";

const InventoryPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  const {
    items,
    loading,
    modalOpen,
    setModalOpen,
    editingItem,
    setEditingItem,
    deleteItem,
    setDeleteItem,
    saveItem,
    confirmDelete,
  } = useInventory();

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleNewItem = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1f2d1c]">Inventario</h2>
        {isAdmin && (
          <button
            onClick={handleNewItem}
            className="px-4 py-2 rounded-xl bg-[#5e7350] text-white hover:bg-[#4c5e41]"
          >
            Nuevo Item
          </button>
        )}
      </div>

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ItemTable
          items={items}
          onEdit={handleEdit}
          onDelete={setDeleteItem}
          isAdmin={isAdmin}
        />
      )}

      {modalOpen && (
        <ItemFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={saveItem}
          item={editingItem}
        />
      )}

      <ConfirmationModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Confirmar Borrado"
        message={`¿Seguro que quieres borrar "${deleteItem?.name}"?`}
        confirmText="Borrar"
        confirmButtonClass="bg-[#ef4444] hover:bg-red-700"
      />
    </div>
  );
};

export default InventoryPage;
