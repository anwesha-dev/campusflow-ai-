import { createContext } from "react";

export type User = {
  name: string;
  email: string;
  role: "student" | "admin";
  id: string;
  batch?: string;
  department?: string;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string, role: "student" | "admin") => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
