import type { User } from "./userTypes";

export interface AuthContextDataTypes {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    nome: string,
    sobrenome: string,
    email: string,
    senha: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
