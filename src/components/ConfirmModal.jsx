// 📂 src/components/ConfirmModal.jsx
import React from "react";

export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h4>{title}</h4>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="carrito-boton" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="carrito-boton vaciar" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
