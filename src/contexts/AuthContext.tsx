import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  role: "student" | "admin";
  id: string;
  batch?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "student" | "admin") => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS = {
  student: {
    email: "student@campus.edu",
    password: "student123",
    user: { name: "Arjun Reddy", email: "student@campus.edu", role: "student" as const, id: "STU-2025-001", batch: "2025", department: "B.Tech CSE" },
  },
  admin: {
    email: "admin@campus.edu",
    password: "admin123",
    user: { name: "Dr. Priya Menon", email: "admin@campus.edu", role: "admin" as const, id: "ADM-001" },
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: "student" | "admin") => {
    const mock = MOCK_USERS[role];
    if (email === mock.email && password === mock.password) {
      setUser(mock.user);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
