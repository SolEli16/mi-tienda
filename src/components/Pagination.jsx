export default function Pagination({ page, total, perPage, onPage }) {
  const pages = Math.ceil(total / perPage);

  return (
    <nav aria-label="Paginación de productos" style={{ marginTop: "20px" }}>
      <button
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
        style={{ marginRight: "10px" }}
      >
        Anterior
      </button>
      <span>
        Página {page} de {pages}
      </span>
      <button
        disabled={page === pages}
        onClick={() => onPage(page + 1)}
        style={{ marginLeft: "10px" }}
      >
        Siguiente
      </button>
    </nav>
  );
}
