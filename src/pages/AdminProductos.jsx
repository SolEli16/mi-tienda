// 📂 src/pages/AdminProductos.jsx
import { useContext, useState } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { toast } from "react-toastify";
import ProductForm from "../components/ProductForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import ConfirmModal from "../components/ConfirmModal"; // 🔹 Importamos el modal

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
  const [confirm, setConfirm] = useState({ open: false, id: null }); // 🔹 Estado para el modal

  // 🗑️ Eliminar producto con confirmación (usando modal)
  const handleDelete = async (id) => {
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
    <div className="admin-container">
      {/* 🧾 SEO con Helmet */}
      <Helmet>
        <title>Talento Tech Shop - Administración</title>
        <meta
          name="description"
          content="Panel de administración de productos en Talento Tech Shop. Crear, editar y eliminar productos."
        />
      </Helmet>

      <h2 className="admin-title">⚙️ Administración de Productos</h2>

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
      <ul className="admin-list">
        {productos.length === 0 && !loading && (
          <li className="admin-item">No hay productos cargados.</li>
        )}
        {productos.map((p) => (
          <li key={p.id} className="admin-item">
            <div className="admin-info">
              <strong>{p.nombre}</strong> — ${p.precio}
              <br />
              <small>{p.descripcion}</small>
            </div>
            <div className="admin-actions">
              <button
                onClick={() => setEditing(p)}
                className="carrito-boton"
                aria-label={`Editar producto ${p.nombre}`}
              >
                <FaEdit /> Editar
              </button>
              <button
                onClick={() => setConfirm({ open: true, id: p.id })} // 🔹 Abrimos modal
                className="carrito-boton eliminar"
                aria-label={`Eliminar producto ${p.nombre}`}
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 🔹 Modal de confirmación */}
      <ConfirmModal
        open={confirm.open}
        title="Eliminar producto"
        message="¿Seguro que querés eliminar este producto?"
        onConfirm={() => {
          handleDelete(confirm.id);
          setConfirm({ open: false, id: null });
        }}
        onCancel={() => setConfirm({ open: false, id: null })}
      />
    </div>
  );
}
