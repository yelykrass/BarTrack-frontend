import React from "react";
import Header from "./Header";
import HeaderNav from "./HeaderNav";
import { useAuth } from "../hooks/useAuth";

/**
 * Загальний Layout для всіх сторінок після логіну
 */
const LayoutAuthenticated = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null; // безпечний захист

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeaderNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default LayoutAuthenticated;
