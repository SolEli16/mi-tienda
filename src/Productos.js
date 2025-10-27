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
  if (productos.length === 0) return <p className="container">⏳ Cargando catálogo...</p>;

  return (
    <div className="container">
      <h2>📦 Catálogo completo</h2>
      <div className="productos-container">
        {productos.map((item) => (
          <div key={item.id} className="product-card">
            <Link to={`/producto/${item.id}`}>
              <strong>{item.nombre}</strong>
            </Link>
            <img src={`${process.env.PUBLIC_URL}/img/${producto.imagen}`} alt={producto.nombre} />
            <p>${item.precio}</p>
            <button
              onClick={() =>
                onAddToCart({
                  id: item.id,
                  title: item.nombre,
                  price: item.precio,
                  image: `/img/${item.imagen}`,
                })
              }
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
