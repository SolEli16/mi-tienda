import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // 👈 usamos el contexto

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext); // 👈 obtenemos el usuario del contexto

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
