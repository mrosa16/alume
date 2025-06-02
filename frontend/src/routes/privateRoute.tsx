import { useEffect, type JSX } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      const timeout = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <div className="text-center">Carregando...</div>;

  return isAuthenticated ? (
    children
  ) : (
    <p className="text-center">Redirecionando em 10 segundos...</p>
  );
}
