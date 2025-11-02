import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutGrid, Archive, Settings } from "lucide-react";

const HeaderNav = () => {
  const navItems = [
    { name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { name: "Inventario", icon: Archive, path: "/inventario" },
    { name: "Configuración", icon: Settings, path: "#" },
  ];

  return (
    <header className="bg-white border-b border-[#cfd8c1]">
      <nav className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="
              flex 
              flex-wrap 
              justify-center 
              items-center 
              gap-4 
              py-4
              text-center
            "
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2
                  px-6 sm:px-8 md:px-10 py-3 sm:py-4
                  min-w-[120px] sm:min-w-[150px]
                  rounded-lg text-sm sm:text-base font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#5e7350]/10 text-[#5e7350] font-semibold"
                      : "text-[#7a8770] hover:bg-gray-100 hover:text-[#1f2d1c]"
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderNav;
