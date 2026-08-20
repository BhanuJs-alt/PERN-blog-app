import { createContext, useEffect, useState, type ReactNode } from "react";

import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await api.get("/auth/user");

      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      await refreshUser();
      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
