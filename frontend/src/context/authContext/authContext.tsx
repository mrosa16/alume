import { createContext, useEffect, useState } from "react";
import type { AuthContextDataTypes } from "./interface/authContextDataTypes";

import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import type { User } from "./interface/userTypes";
import { toast } from "react-toastify";

export const AuthContext = createContext<AuthContextDataTypes>(
  {} as AuthContextDataTypes
);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

    setLoading(false);
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
    try {
      const response = await api.post("/auth/login", { email, senha });

      const { access_token, student } = response.data;

      if (!access_token || !student) {
        toast.error("Erro ao autenticar. Tente novamente.");
        return;
      }

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(student));
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      setUser(student);

      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Email ou senha inválidos.");
      } else {
        toast.error("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
