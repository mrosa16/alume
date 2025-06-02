// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/auth";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
