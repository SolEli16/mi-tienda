import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

const API_URL = "https://692da3e9e5f67cd80a4c5a07.mockapi.io/productos";

export function ProductsProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ arranca en true
  const [error, setError] = useState("");

  // 📥 Obtener productos
  const fetchProductos = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`Error de red: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setProductos(data);
      } else {
        setError("No hay productos disponibles en la tienda");
      }
    } catch (e) {
      console.error("Error al cargar productos:", e);
      setError("No se pudieron cargar los productos. Verifica la conexión o la API.");
    } finally {
      setLoading(false);
    }
  };

  // ➕ Crear producto
  const crearProducto = async (nuevo) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });
      const data = await res.json();
      setProductos((prev) => [...prev, data]);
      return data;
    } catch {
      throw new Error("Error al crear producto");
    }
  };

  // ✏️ Actualizar producto
  const actualizarProducto = async (id, actualizado) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado),
      });
      const data = await res.json();
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? data : p))
      );
      return data;
    } catch {
      throw new Error("Error al actualizar producto");
    }
  };

  // ❌ Eliminar producto
  const eliminarProducto = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch {
      throw new Error("Error al eliminar producto");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        productos,
        loading,
        error,
        fetchProductos,
        crearProducto,
        actualizarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
