export default function SearchBar({ query, onChange, onCategory }) {
  return (
    <div role="search" style={{ marginBottom: "20px" }}>
      <input
        type="search"
        placeholder="Buscar por nombre..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar productos"
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <select
        onChange={(e) => onCategory(e.target.value)}
        aria-label="Categoría"
        style={{ padding: "5px" }}
      >
        <option value="">Todas</option>
        <option value="ropa">Ropa</option>
        <option value="tecnologia">Tecnología</option>
      </select>
    </div>
  );
}
