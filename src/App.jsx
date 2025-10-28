// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthRepository from "./components/AuthRepository";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/LoginPage"

const App = () => {
  const [authData, setAuthData] = useState({ auth: null, user: null });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage onLogin={(data) => setAuthData(data)} />}
        />
        <Route
          path="/private"
          element={
            <RequireAuth auth={authData.auth}>
              <AuthRepository auth={authData.auth} user={authData.user} />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
