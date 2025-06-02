import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="text-center">Carregando...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
