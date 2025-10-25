import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Productos({ onAddToCart }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/productos')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar productos');
        return res.json();
      })
      .then((data) => setProductos(data))
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
            <img src={`/img/${item.imagen}`} alt={item.nombre} />
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