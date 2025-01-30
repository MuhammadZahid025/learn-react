import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";

interface User {
  id: string;
  email: string;
  password: string;
}
interface ProviderProps {
  register: (userData: User) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: User | null;
}

export const AuthContext = createContext<ProviderProps>({
  register: async () => {},
  login: async () => {},
  logout: () => {},
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const register = async (userData: User) => {
    localStorage.setItem(userData.email, JSON.stringify(userData));
    await navigate("/login");
  };

  const login = async (email: string, password: string) => {
    const storedUser = localStorage.getItem(email);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.password === password) {
        setUser(parsedUser);
        localStorage.setItem("loggedIn", JSON.stringify(parsedUser));
        navigate("/home");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
