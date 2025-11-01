//import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

const App = ({ children }) => {
  const { redirectTo, setRedirectTo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo, { replace: true });
      setRedirectTo(null);
    }
  }, [redirectTo, navigate, setRedirectTo]);

  return children;
};

export default App;
