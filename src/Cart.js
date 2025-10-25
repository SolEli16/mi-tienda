import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cartItems }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>🧺 Carrito</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} x {item.quantity} = ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      )}
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
      <Link to="/">← Seguir comprando</Link>
    </div>
  );
}

export default Cart;