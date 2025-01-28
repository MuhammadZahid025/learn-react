import { createContext } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext({
  register: (_userData: { email: string; password: string }) => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const register = async (userData: { email: string; password: string }) => {
    localStorage.setItem("user", JSON.stringify(userData));
    await navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ register }}>{children}</AuthContext.Provider>
  );
}
