import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

export const useInventory = () => useContext(InventoryContext);
