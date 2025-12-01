import { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { toast } from "react-toastify";
import ProductForm from "../components/ProductForm";

export default function AdminProductos() {
  const {
    productos,
    loading,
    error,
    eliminarProducto,
    crearProducto,
    actualizarProducto,
  } = useContext(ProductsContext);

  const [editing, setEditing] = useState(null);

  // 🗑️ Eliminar producto con confirmación
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;
    try {
      await eliminarProducto(id);
      toast.success("Producto eliminado correctamente");
    } catch {
      toast.error("Error al eliminar producto");
    }
  };

  // ✏️ Guardar producto nuevo o editado
  const handleSave = async (producto) => {
    try {
      if (editing) {
        await actualizarProducto(editing.id, producto);
        toast.success("Producto actualizado");
      } else {
        await crearProducto(producto);
        toast.success("Producto creado");
      }
      setEditing(null);
    } catch {
      toast.error("Error al guardar producto");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Administración de Productos</h2>

      {/* Mensajes de carga y error */}
      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Formulario controlado */}
      <ProductForm
        initial={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />

      {/* Listado de productos */}
      <ul className="list-group mt-4">
        {productos.length === 0 && !loading && (
          <li className="list-group-item">No hay productos cargados.</li>
        )}
        {productos.map((p) => (
          <li
            key={p.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{p.nombre}</strong> — ${p.precio}
              <br />
              <small>{p.descripcion}</small>
            </div>
            <div>
              <button
                onClick={() => setEditing(p)}
                className="btn btn-sm btn-primary me-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="btn btn-sm btn-danger"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
