import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  // 🧮 Contador de productos en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div className="nav-left" style={{ display: "flex", gap: "15px" }}>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/reseñas">Reseñas</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/admin">Admin</Link>
      </div>

      <div className="nav-right" style={{ display: "flex", gap: "15px" }}>
        {isAuthenticated ? (
          <>
            <span style={{ marginRight: "10px" }}>
              👤 {user?.email}
            </span>
            <button
              onClick={logout}
              style={{
                backgroundColor: "#cd20f8",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              backgroundColor: "#cd20f8",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Iniciar sesión
          </Link>
        )}

        <Link
          to="/carrito"
          style={{
            backgroundColor: "#198754",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          🛒 Carrito ({totalItems})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
