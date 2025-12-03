// 📂 src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  // 🧮 Contador de productos en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Links de navegación a la izquierda */}
        <div className="nav-left d-flex gap-3">
          <Link className="nav-link text-white fw-bold" to="/">Inicio</Link>
          <Link className="nav-link text-white fw-bold" to="/productos">Productos</Link>
          <Link className="nav-link text-white fw-bold" to="/reseñas">Reseñas</Link>
          <Link className="nav-link text-white fw-bold" to="/contacto">Contacto</Link>
          <Link className="nav-link text-white fw-bold" to="/admin">Admin</Link>
        </div>

        {/* Botones a la derecha */}
        <div className="nav-right d-flex gap-2 align-items-center">
          {isAuthenticated ? (
            <>
              <span className="text-white me-2">👤 {user?.email}</span>
              <button onClick={logout} className="carrito-boton">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="carrito-boton">
              Iniciar sesión
            </Link>
          )}

          <Link to="/carrito" className="carrito-boton">
            🛒 Carrito ({totalItems})
          </Link>
        </div>
      </div>
    </nav>
  );
}
