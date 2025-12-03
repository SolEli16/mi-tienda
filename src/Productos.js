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
    <div className="productos-container">
      {productos.map((producto) => (
        <div key={producto.id} className="producto-card">
          <img
            src={`${process.env.PUBLIC_URL}/img/${producto.imagen}`}
            alt={producto.nombre}
            className="producto-imagen"
          />
          <h3>{producto.nombre}</h3>
          <p>💰 ${producto.precio}</p>

          {/* Botón de Ver detalle arriba */}
          <Link to={`/producto/${producto.id}`} className="producto-boton">
            Ver detalle
          </Link>

          {/* Botón de Agregar al carrito debajo */}
          <button
            className="producto-boton"
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
  );
}

