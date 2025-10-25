import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/productos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Producto no encontrado');
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
          src={`/img/${producto.imagen}`}
          alt={producto.nombre}
          className="detalle-imagen"
        />
        <div className="detalle-info">
          <h2 className="detalle-nombre">{producto.nombre}</h2>
          <p className="detalle-descripcion">{producto.descripcion}</p>
          <p className="detalle-precio">💰 ${producto.precio}</p>
          <button
            className="detalle-boton"
            onClick={() =>
              onAddToCart({
                id: producto.id,
                title: producto.nombre,
                price: producto.precio,
                image: `/img/${producto.imagen}`,
              })
            }
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;