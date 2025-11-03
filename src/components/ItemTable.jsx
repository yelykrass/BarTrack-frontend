import React from "react";
import ItemRow from "./ItemRow";
import { useAuth } from "../hooks/useAuth";

const ItemTable = ({ items, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="min-w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Categoría</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Vencimiento</th>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
