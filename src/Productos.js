// 📂 src/Productos.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./contexts/CartContext";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://692da3e9e5f67cd80a4c5a07.mockapi.io/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="productos-page">
      <h2>📚 Catálogo de productos</h2>
      <div className="productos-container">
        {productos.map((producto) => (
          <div key={producto.id} className="product-card">
            <img
              src={`${process.env.PUBLIC_URL}/img/${producto.imagen}`}
              alt={producto.nombre}
            />
            <h3>{producto.nombre}</h3>
            <p>💰 ${producto.precio}</p>

            {/* Botón de Ver detalle */}
            <Link to={`/producto/${producto.id}`} className="product-card-button">
              Ver detalle
            </Link>

            {/* Botón de Agregar al carrito */}
            <button
              className="product-card-button"
              onClick={() =>
                addToCart({
                  id: producto.id,
                  nombre: producto.nombre,
                  precio: producto.precio,
                  imagen: producto.imagen,
                })
              }
            >
              🛒 Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


