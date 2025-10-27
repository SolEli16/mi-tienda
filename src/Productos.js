import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Productos({ onAddToCart }) {
  const [productos, setProductos] = useState([]);
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
              imagen
            }
          }
        `
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar productos');
        return res.json();
      })
      .then((data) => {
        if (data.errors) throw new Error('Error en la consulta GraphQL');
        setProductos(data.data.productos);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="container">❌ {error}</p>;
  if (!productos.length) return <p className="container">⏳ Cargando productos...</p>;

  return (
    <div className="productos-container">
      {productos.map((producto) => (
        <div key={producto.id} className="producto-card">
          <Link to={`/producto/${producto.id}`}>
            <img
              src={`${process.env.PUBLIC_URL}/img/${producto.imagen}`}
              alt={producto.nombre}
              className="producto-imagen"
            />
          </Link>
          <h3>{producto.nombre}</h3>
          <p>💰 ${producto.precio}</p>
          <button
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
      ))}
    </div>
  );
}

export default Productos;

