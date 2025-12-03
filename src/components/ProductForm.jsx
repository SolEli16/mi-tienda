import { useState, useEffect } from "react";

export default function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm(initial);
    } else {
      setForm({ nombre: "", precio: "", descripcion: "" });
    }
  }, [initial]);

  // ✅ Validaciones
  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (Number(form.precio) <= 0) e.precio = "El precio debe ser mayor a 0";
    if ((form.descripcion || "").trim().length < 10)
      e.descripcion = "La descripción debe tener al menos 10 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    // 🔄 Resetear si es creación
    if (!initial) {
      setForm({ nombre: "", precio: "", descripcion: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          className={`form-input ${errors.nombre ? "is-invalid" : ""}`}
          value={form.nombre}
          onChange={(e) => handleChange("nombre", e.target.value)}
        />
        {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
      </div>

      <div className="form-group">
        <label>Precio</label>
        <input
          type="number"
          className={`form-input ${errors.precio ? "is-invalid" : ""}`}
          value={form.precio}
          onChange={(e) => handleChange("precio", e.target.value)}
        />
        {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          className={`form-input ${errors.descripcion ? "is-invalid" : ""}`}
          value={form.descripcion}
          onChange={(e) => handleChange("descripcion", e.target.value)}
        />
        {errors.descripcion && (
          <div className="invalid-feedback">{errors.descripcion}</div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="carrito-boton">
          {initial ? "Actualizar" : "Crear"}
        </button>
        {initial && (
          <button
            type="button"
            className="carrito-boton vaciar"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

