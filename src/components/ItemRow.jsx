import React from "react";
import { Trash2, Edit } from "lucide-react";

const ItemRow = ({ item, onEdit, onDelete, isAdmin }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-2">{item.name}</td>
      <td className="px-4 py-2">{item.category}</td>
      <td className="px-4 py-2">{item.quantity}</td>
      <td className="px-4 py-2">{item.price}</td>
      <td className="px-4 py-2">{item.expiryDate}</td>
      <td className="px-4 py-2">{item.username}</td>
      <td className="px-4 py-2 flex gap-2">
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(item)}
              className="text-[#5e7350] hover:text-[#4c5e41]"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(item)}
              className="text-[#ef4444] hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default ItemRow;
