import { useContext } from "react";
import { AuthContext, AuthContextType } from "./auth-core";

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext) as AuthContextType | null;
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default useAuth;
