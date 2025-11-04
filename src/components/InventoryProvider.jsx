import { useState, useEffect, useMemo, useCallback } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { useAuth } from "../hooks/useAuth";
import ItemRepository from "./ItemRepository";

export const InventoryProvider = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const repo = useMemo(() => new ItemRepository(), []);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const fetchItems = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const data = await repo.getAll();
      setItems(data);
    } catch (err) {
      if (err.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  }, [repo, isAuthenticated, logout]);

  const saveItem = useCallback(
    async (item) => {
      if (!isAuthenticated) return;
      try {
        item.id ? await repo.update(item.id, item) : await repo.create(item);
        await fetchItems();
        setModalOpen(false);
        setEditingItem(null);
      } catch (err) {
        if (err.response?.status === 401) logout();
      }
    },
    [repo, isAuthenticated, fetchItems, logout]
  );

  const confirmDelete = useCallback(async () => {
    if (!deleteItem || !isAuthenticated) return;
    try {
      await repo.delete(deleteItem.id);
      setDeleteItem(null);
      await fetchItems();
    } catch (err) {
      if (err.response?.status === 401) logout();
    }
  }, [repo, deleteItem, isAuthenticated, fetchItems, logout]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

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
