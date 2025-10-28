import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";

function App() {
  // We'll store the user in memory and keep Basic auth header in sessionStorage
  const [user, setUser] = useState(null);

  // On mount, if Basic auth header exists in sessionStorage, try to fetch current user
  useEffect(() => {
    const basicAuth = sessionStorage.getItem("basicAuth");
    if (!basicAuth) return;

    const fetchMe = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${base}/me`, {
          headers: { Authorization: basicAuth },
        });
        if (!res.ok) {
          // auth invalid — remove it
          sessionStorage.removeItem("basicAuth");
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user || data);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
        setUser(null);
      }
    };

    fetchMe();
  }, []);

  const handleLogin = ({ auth, user: loggedUser }) => {
    // Save Basic auth header in sessionStorage (ephemeral) and keep user in memory state.
    if (auth) sessionStorage.setItem("basicAuth", auth);
    setUser(loggedUser || null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("basicAuth");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard user={user} onLogout={handleLogout} />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

