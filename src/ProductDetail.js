// 📂 src/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // 👈 importamos Link
import { useCart } from "./contexts/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://692da3e9e5f67cd80a4c5a07.mockapi.io/productos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar producto");
        return res.json();
      })
      .then((data) => setProducto(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="container">❌ {error}</p>;
  if (!producto) return <p className="container">⏳ Cargando producto...</p>;

  return (
    <div className="detalle-container">
      <div className="detalle-card">
        <img
          src={`${process.env.PUBLIC_URL}/img/${producto.imagen}`}
          alt={producto.nombre}
          className="detalle-imagen"
        />
        <div className="detalle-info">
          <h2 className="detalle-nombre">{producto.nombre}</h2>
          <p className="detalle-descripcion">{producto.descripcion}</p>
          <p className="detalle-precio">💰 ${producto.precio}</p>

          {/* Botón de agregar al carrito */}
          <button
            className="detalle-boton"
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

          {/* Botón de volver a productos */}
          <Link to="/productos" className="detalle-boton volver-boton">
            🔙 Volver a productos
          </Link>
        </div>
      </div>
    </div>
  );
}
