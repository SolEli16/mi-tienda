// 📂 src/Productos.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./contexts/CartContext";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet";
import styled from "styled-components";

// 🎨 Styled-components para modularidad
const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 12px;
  text-align: center;
  transition: transform 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h5`
  color: #cd20f8;
  font-weight: bold;
  font-size: 1rem;
  margin: 8px 0;
`;

const Price = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  color: #198754;
  margin-bottom: 8px;
`;

const Button = styled.button`
  background: #cd20f8;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: bold;
  margin: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: inline-block;
  width: auto;
  &:hover {
    background: #a500a5;
  }
`;

const DetailButton = styled(Link)`
  background: transparent;
  color: #cd20f8;
  border: 2px solid #cd20f8;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: bold;
  margin: 4px;
  text-decoration: none;
  display: inline-block;
  &:hover {
    background: #cd20f8;
    color: white;
  }
`;

const ProductImage = styled.img`
  max-width: 150px;
  height: 150px;
  object-fit: contain;
  border-radius: 6px;
  margin-bottom: 10px;
  display: block;
`;

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [pagina, setPagina] = useState(1);
  const productosPorPagina = 6;

  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://692da3e9e5f67cd80a4c5a07.mockapi.io/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error(err));
  }, []);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const indexUltimo = pagina * productosPorPagina;
  const indexPrimero = indexUltimo - productosPorPagina;
  const productosVisibles = productosFiltrados.slice(indexPrimero, indexUltimo);

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  return (
    <div className="productos-page container mt-4">
      <Helmet>
        <title>Chucherías de Ensueño - Catálogo</title>
        <meta
          name="description"
          content="Explora el catálogo de productos de Talento Tech Shop. Cuadernos, lapiceras y más."
        />
      </Helmet>

      <h2 className="text-center mb-4">📚 Catálogo de productos</h2>

      {/* 🔍 Barra de búsqueda centrada */}
      <div className="row mb-4">
        <div className="col-12 col-md-6 mx-auto d-flex align-items-center">
          <FaSearch className="me-2" />
          <input
            type="text"
            placeholder="Buscar producto..."
            aria-label="Buscar producto por nombre"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagina(1);
            }}
            className="form-control"
          />
        </div>
      </div>

      {/* 📦 Contenedor de productos con Bootstrap grid */}
      <div className="row">
        {productosVisibles.map((producto) => (
          <div key={producto.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <Card>
              <ProductImage
                src={`${process.env.PUBLIC_URL}/img/${producto.imagen}`}
                alt={producto.nombre}
              />
              <Title>{producto.nombre}</Title>
              <Price>💰 ${producto.precio}</Price>

              <div>
                <DetailButton
                  to={`/producto/${producto.id}`}
                  aria-label={`Ver detalle de ${producto.nombre}`}
                >
                  Ver detalle
                </DetailButton>

                <Button
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
                  <FaShoppingCart /> Agregar
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 📄 Paginación */}
      <div className="paginacion text-center mt-4">
        {Array.from({ length: totalPaginas }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPagina(i + 1)}
            className={`btn btn-sm mx-1 ${pagina === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
            aria-label={`Ir a página ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
