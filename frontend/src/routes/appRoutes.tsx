// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/auth";

import DashboardPage from "../pages/dashboard/dashboardPage";
import { PrivateRoute } from "./privateRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas*/}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

      {/* Rotas Privadas e protegidas */}   
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
}

export default AppRoutes;
