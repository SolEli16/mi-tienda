import React, { useState, useEffect, useRef  } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import ProductDetail from './ProductDetail';
import Productos from './Productos';
import Reseñas from './Reseñas';
import Contacto from './Contacto';

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [resumenCompra, setResumenCompra] = useState([]);
  const [numeroPedido, setNumeroPedido] = useState("");


  const isAuthenticated = !!user;

  // 🧠 Cargar carrito guardado al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 💾 Guardar carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);
  // 🔄 Reiniciar resumen si se agregan nuevos productos
useEffect(() => {
  if (cart.length > 0) {
    setCompraFinalizada(false);
    setResumenCompra([]);
  }
}, [cart]);


  // 🔐 Cargar usuario guardado al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('usuario');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem('usuario', username);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== id));
};

  const clearCart = () => {
    setCart([]);
    alert('🧹 Carrito vaciado con éxito');
  };

  const increaseQty = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQty = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};

  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartRef = useRef();

useEffect(() => {
  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
const [showFinalizar, setShowFinalizar] = useState(false);
const [showMensaje, setShowMensaje] = useState(false);

  return (
    <div
      style={{
        backgroundImage: 'url("/fondo.png")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Router>
       <nav className="navbar">
  <div className="nav-left">
    <Link to="/">
      <img src="/logo.jpg" alt="Logo de la tienda" className="logo" />
    </Link>
    <Link to="/">Inicio</Link>
    <Link to="/productos">Productos</Link>
    <Link to="/reseñas">Reseñas</Link>
    <Link to="/contacto">Contacto</Link>
  </div>

  <div className="nav-right">
    {isAuthenticated ? (
  <button
    onClick={() => {
      setUser(null);
      localStorage.removeItem('usuario');
    }}
    style={{
      backgroundColor: '#cd20f8',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
      marginRight: '20px',
      marginTop: '6px'
    }}
  >
    Cerrar sesión
  </button>
) : (
  <Link
    to="/login"
    style={{
      backgroundColor: '#cd20f8',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '16px',
      textDecoration: 'none',
      marginRight: '20px',
      marginTop: '6px'
    }}
  >
    Iniciar sesión
  </Link>
)}


    {/* 🛒 Carrito desplegable */}
    <div className="cart-dropdown" ref={cartRef}>
      <button className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
        🛒 ({cart.length})
      </button>
      {isCartOpen && (
        <div className="cart-content">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-thumb" />
              <div className="cart-details">
                <strong>{item.title}</strong>
                <div className="cart-qty">
                  <button onClick={() => decreaseQty(item.id)}>➖</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>➕</button>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>❌</button>
            </div>
          ))}
          <p className="cart-total">
            Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </p>
          <button className="clear-btn" onClick={clearCart}>Vaciar carrito</button>
          <Link to="/carrito" className="go-cart-link">Finalizar compra</Link>
        </div>
      )}
    </div>
  </div>
</nav>

        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/producto/:id" element={<ProductDetail onAddToCart={addToCart} />} />
          <Route path="/productos" element={<Productos onAddToCart={addToCart} />} />
        <Route
  path="/carrito"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <div className="cart-container">
        <h2>🧺 Carrito</h2>

        {compraFinalizada ? (
          <>
            <h3 style={{ color: '#4a006b' }}>Resumen de la compra de {user}:</h3>
            <ul>
              {resumenCompra.map((item, index) => (
                <li key={index}>
                  {item.title} x {item.quantity} = ${item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p id="total">
              💰 Total: $
              {resumenCompra.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </p>
            <p style={{ fontSize: '18px', textAlign: 'center', color: '#4a006b', marginTop: '20px' }}>
              Gracias por tu compra, {user} 💌. En breve recibirás por email los pasos a seguir.<br />
              🧾 Número de pedido: <strong>{numeroPedido}</strong>
            </p>
          </>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.title} x {item.quantity} = ${item.price * item.quantity}
                </li>
              ))}
            </ul>

            <p id="total">
              💰 Total: $
              {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </p>

            <button
              style={{
                marginTop: '10px',
                backgroundColor: '#cd20f8',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              onClick={() => {
                const nuevoPedido = "PED-" + Date.now().toString().slice(-6);
                setNumeroPedido(nuevoPedido);
                setResumenCompra(cart);
                setCart([]);
                setCompraFinalizada(true);
              }}
            >
              Finalizar compra
            </button>
          </>
        )}
      </div>
    </ProtectedRoute>
  }
/>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/reseñas" element={<Reseñas />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;