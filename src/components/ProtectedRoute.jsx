// 📂 src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  // Si el usuario está autenticado, renderiza los hijos
  if (isAuthenticated) {
    return children;
  }

  // Si no está autenticado, redirige al login
  return <Navigate to="/login" replace />;
}
