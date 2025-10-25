import React, { useState } from 'react';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, telefono, mensaje } = formData;
    if (nombre && email && telefono && mensaje) {
      setEnviado(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
      });
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', color: '#a500a5', fontSize: '32px' }}>
        📬 Contactanos
      </h1>
      <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginBottom: '30px' }}>
        ¿Tenés dudas, sugerencias o simplemente querés decir hola? ¡Escribinos con amor! 💜
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Tu email"
          required
          style={inputStyle}
        />
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Número de contacto"
          required
          style={inputStyle}
        />
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Escribí tu mensaje aquí..."
          rows="5"
          required
          style={{
            ...inputStyle,
            resize: 'none',
            height: '120px'
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#cd20f8',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          Enviar mensaje
        </button>
      </form>

      {enviado && (
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', color: '#4a006b' }}>
          ¡Gracias por tu mensaje, {formData.nombre || 'amigx'}! Te responderemos pronto 💌
        </p>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '8px',
  border: '1px solid #ccc',
  marginBottom: '15px',
  fontFamily: 'inherit'
};

export default Contacto;
