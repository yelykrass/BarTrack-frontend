import { useState, useEffect, useMemo, useCallback } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { useAuth } from "../hooks/useAuth";
import ItemRepository from "../components/ItemRepository";

export const InventoryProvider = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const repo = useMemo(() => new ItemRepository(), []);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // 🧠 робимо функцію стабільною, щоб не створювалася при кожному рендері
  const fetchItems = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const data = await repo.getAll();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      if (error?.response?.status === 401 || error.message === "Unauthorized") {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }, [repo, isAuthenticated, logout]);

  const saveItem = useCallback(
    async (item) => {
      if (!isAuthenticated) return;
      try {
        if (item.id) {
          await repo.update(item.id, item);
        } else {
          await repo.create(item);
        }
        await fetchItems();
        setModalOpen(false);
        setEditingItem(null);
      } catch (error) {
        console.error("Error saving item:", error);
        if (
          error?.response?.status === 401 ||
          error.message === "Unauthorized"
        ) {
          logout();
        }
      }
    },
    [repo, isAuthenticated, logout, fetchItems]
  );

  const confirmDelete = useCallback(async () => {
    if (!deleteItem || !isAuthenticated) return;
    try {
      await repo.delete(deleteItem.id);
      setDeleteItem(null);
      await fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      if (error?.response?.status === 401 || error.message === "Unauthorized") {
        logout();
      }
    }
  }, [repo, deleteItem, isAuthenticated, logout, fetchItems]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]); // ✅ тепер ESLint щасливий

  return (
    <InventoryContext.Provider
      value={{
        items,
        loading,
        modalOpen,
        setModalOpen,
        editingItem,
        setEditingItem,
        deleteItem,
        setDeleteItem,
        fetchItems,
        saveItem,
        confirmDelete,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
