import { useCallback, useMemo } from "react";
import AuthRepository from "../components/AuthRepository";

export const useCheckAuth = () => {
  // Стабільний authRepo
  const authRepo = useMemo(() => new AuthRepository(), []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await authRepo.checkSession();
      return response; // { auth: true/false, user }
    } catch {
      return { auth: false, user: null };
    }
  }, [authRepo]);

  return checkAuth;
};
