import { useContext, useMemo, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

export default function AllProductos() {
  const { productos, loading, error } = useContext(ProductsContext);

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6; // cantidad de productos por página

  // 🔎 Filtrar productos por nombre y categoría
  const filtered = useMemo(() => {
    return productos.filter((p) => {
      const matchesName = p.nombre?.toLowerCase().includes(query.toLowerCase());
      const matchesCat = cat ? p.categoria === cat : true;
      return matchesName && matchesCat;
    });
  }, [productos, query, cat]);

  // 📄 Paginación con slice()
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>Catálogo de Productos</h2>

      {/* Barra de búsqueda */}
      <SearchBar query={query} onChange={setQuery} onCategory={setCat} />

      {/* Grid de productos */}
      <div className="row">
        {paged.map((p) => (
          <div key={p.id} className="col-12 col-md-6 col-lg-4">
            <div className="card" style={{ marginBottom: "20px" }}>
              <div className="card-body">
                <h5>{p.nombre}</h5>
                <p>{p.descripcion}</p>
                <p><strong>${p.precio}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <Pagination
        page={page}
        perPage={perPage}
        total={filtered.length}
        onPage={setPage}
      />
    </div>
  );
}
