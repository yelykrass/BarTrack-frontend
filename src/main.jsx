import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import LayoutAuthenticated from "./components/LayoutAuthenticated.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <App>
              <LoginPage />
            </App>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <App>
                <LayoutAuthenticated>
                  <Dashboard />
                </LayoutAuthenticated>
              </App>
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
