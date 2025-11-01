import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import { useNavigate } from "react-router-dom";

const App = () => {
  const { redirectTo, setRedirectTo, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo, { replace: true });
      setRedirectTo(null);
    }
  }, [redirectTo, navigate, setRedirectTo]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <LoginPage />;
  // return <Navigate to="/login" replace />;
};

export default App;
