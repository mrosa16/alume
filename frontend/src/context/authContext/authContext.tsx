import { createContext, useEffect, useState } from "react";
import type { AuthContextDataTypes } from "./interface/authContextDataTypes";

import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import type { User } from "./interface/userTypes";

export const AuthContext = createContext<AuthContextDataTypes>(
  {} as AuthContextDataTypes
);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const isAuthenticated = !!user;
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (err) {
        console.warn("Erro ao fazer parse do userData:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const register = async (
    nome: string,
    sobrenome: string,
    email: string,
    senha: string
  ) => {
    const response = await api.post("/auth/register", {
      nome,
      sobrenome,
      email,
      senha,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
    navigate("/dashboard");
  };

  const login = async (email: string, senha: string) => {
    const response = await api.post("/auth/login", { email, senha });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
