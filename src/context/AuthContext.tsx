import { createContext, useState } from "react";
import { useNavigate } from "react-router";

interface User {
  id: number;
  email: string;
  password: string;
}
interface AuthContextType {
  register: (userData: User) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loggedIn: User;
}

export const AuthContext: React.Context<AuthContextType> = createContext({
  register: async (_userData: User) => {},
  login: async (_email: string, _password: string) => {},
  logout: () => {},
  loggedIn: { id: 0, email: "", password: "" },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState({
    id: 0,
    email: "",
    password: "",
  });

  const register = async (userData: User) => {
    localStorage.setItem(userData.email, JSON.stringify(userData));
    await navigate("/login");
  };

  const login = async (email: string, password: string) => {
    const storedUser = localStorage.getItem(email);
    console.log(storedUser);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.password === password) {
        setLoggedIn(parsedUser);
        localStorage.setItem("loggedIn", JSON.stringify(parsedUser));
        navigate("/home");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn({ id: 0, email: "", password: "" });
  };

  return (
    <AuthContext.Provider value={{ loggedIn, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
