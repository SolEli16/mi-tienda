import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      {/* 🎀 Bienvenida */}
      <h1 style={{ textAlign: 'center', color: '#a500a5', fontSize: '36px' }}>
        Bienvenida a Chucherías de Ensueño
      </h1>
      <p style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
        Descubrí los productos más tiernos y funcionales para tu escritorio, tu mochila o tu corazón 💜
      </p>

      {/* 🧑‍🎨 Quiénes somos */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#4a006b', fontSize: '28px' }}>¿Quiénes somos?</h2>
        <p style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.6' }}>
          Somos una tienda apasionada por los detalles. Cada producto está pensado para alegrarte el día,
          organizar tu espacio y expresar tu estilo. Desde stickers kawaii hasta cuadernos pastel, todo lo que ves
          fue seleccionado con amor y dedicación.
        </p>
      </div>

      {/* 🛍️ Cómo comprar */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#4a006b', fontSize: '28px' }}>¿Cómo comprar?</h2>
        <ol style={{ paddingLeft: '25px', fontSize: '22px', fontWeight: 'bold', lineHeight: '2', color: '#4a006b' }}>
          <li>Explorá el <Link to="/productos">catálogo completo</Link> y elegí tus favoritos.</li>
          <li>Hacé clic en “Agregar al carrito” en cada producto que te guste.</li>
          <li>Cuando estés lista, abrí el carrito 🛒 desde la parte superior o accedé a <Link to="/carrito">Finalizar compra</Link>.</li>
          <li>Iniciá sesión con tu nombre para confirmar tu pedido.</li>
          <li>¡Listo! Recibirás tu pedido con mucho amor y packaging kawaii 💌</li>
        </ol>
      </div>

      {/* 🛍️ Botón al catálogo */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/productos" className="go-cart-link">
          🌟 Ver catálogo completo →
        </Link>
      </div>

      {/* 🌟 Reseñas destacadas */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#4a006b', fontSize: '28px' }}>Reseñas destacadas</h2>
        <div className="reseñas-container">
          <div className="reseña">
            <img src="https://i.pravatar.cc/80?img=4" alt="Cliente feliz" />
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
              “Todo llegó rapidísimo y súper bien presentado. ¡Gracias!”
            </p>
          </div>
          <div className="reseña">
            <img src="https://i.pravatar.cc/80?img=5" alt="Cliente feliz" />
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
              “Me encantó la calidad de los productos. ¡Volveré a comprar!”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
