import React, { useState } from 'react';

function Reseñas() {
  const [reseñas, setReseñas] = useState([]);
  const [nuevaReseña, setNuevaReseña] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nuevaReseña.trim() !== "") {
      setReseñas([...reseñas, nuevaReseña]);
      setNuevaReseña("");
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', color: '#a500a5', fontSize: '32px' }}>
        💬 Opiniones de nuestros clientes
      </h1>

      {/* 📝 Lista de reseñas agregadas */}
      <div className="reseñas-container" style={{ marginTop: '30px' }}>
        {reseñas.length === 0 ? (
          <p style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
            Aún no hay reseñas. ¡Sé la primera en dejar tu comentario! 💌
          </p>
        ) : (
          reseñas.map((texto, index) => (
            <div key={index} className="reseña">
              <img src={`https://i.pravatar.cc/80?img=${index + 10}`} alt="Cliente feliz" />
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>“{texto}”</p>
            </div>
          ))
        )}
      </div>

      {/* ✍️ Formulario para agregar reseña */}
      <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
        <textarea
          value={nuevaReseña}
          onChange={(e) => setNuevaReseña(e.target.value)}
          placeholder="Escribí tu reseña aquí..."
          rows="4"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '10px',
            fontFamily: 'inherit'
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#cd20f8',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Enviar reseña
        </button>
      </form>
    </div>
  );
}

export default Reseñas;
