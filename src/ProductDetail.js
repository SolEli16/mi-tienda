import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api-productos.vercel.app/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query {
            productos {
              id
              nombre
              precio
              descripcion
              imagen
            }
          }
        `
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar producto');
        return res.json();
      })
      .then((data) => {
        if (data.errors) throw new Error('Error en la consulta GraphQL');
        const productoEncontrado = data.data.productos.find((p) => p.id.toString() === id);
        if (!productoEncontrado) throw new Error('Producto no encontrado');
        setProducto(productoEncontrado);
      })
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
          <button
            className="detalle-boton"
            onClick={() =>
              onAddToCart({
                id: producto.id,
                title: producto.nombre,
                price: producto.precio,
                image: `${process.env.PUBLIC_URL}/img/${producto.imagen}`,
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
