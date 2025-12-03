// 📂 src/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "./contexts/CartContext";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet";

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

  if (error) return <p className="detalle-container">❌ {error}</p>;
  if (!producto) return <p className="detalle-container">⏳ Cargando producto...</p>;

  return (
    <div className="detalle-container">
      {/* 🧾 SEO con Helmet */}
      <Helmet>
        <title>{`Talento Tech Shop - ${producto?.nombre || "Detalle de producto"}`}</title>
        <meta
          name="description"
          content={`Detalle del producto ${producto?.nombre}. Precio: $${producto?.precio}.`}
        />
      </Helmet>

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
            aria-label={`Agregar ${producto.nombre} al carrito`}
            onClick={() =>
              addToCart({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
              })
            }
          >
            <FaShoppingCart /> Agregar al carrito
          </button>

          {/* Botón de volver a productos */}
          <Link
            to="/productos"
            className="detalle-boton volver-boton"
            aria-label="Volver al catálogo de productos"
          >
            <FaArrowLeft /> Volver a productos
          </Link>
        </div>
      </div>
    </div>
  );
}
