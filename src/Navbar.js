import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget'; // si tenés un ícono o contador

function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/reseñas">Reseñas</Link>
        <Link to="/contacto">Contacto</Link>
      </div>

      <div className="nav-right">
        {isAuthenticated ? (
  <button
  onClick={() => {
    setUser(null);
    localStorage.removeItem('usuario');
  }}
  style={{
    backgroundColor: '#cd20f8',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginRight: '20px'
  }}
>
  Cerrar sesión
</button>

) : (
  <Link to="/login" className="kawaii-button">Iniciar sesión</Link>
)}

        <CartWidget />
      </div>
    </nav>
  );
}

export default Navbar;
