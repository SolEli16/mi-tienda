// 📂 src/pages/Carrito.jsx
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Carrito() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
    cartTotalItems,
    cartTotalPrice,
  } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [resumenCompra, setResumenCompra] = useState([]);
  const [numeroPedido, setNumeroPedido] = useState("");

  const finalizarCompra = () => {
    const nuevoPedido = "PED-" + Date.now().toString().slice(-6);
    setNumeroPedido(nuevoPedido);
    setResumenCompra(cart);
    clearCart();
    setCompraFinalizada(true);
  };

  return (
    <div className="cart-container">
      <h2>🧺 Carrito</h2>

      {compraFinalizada ? (
        <>
          <h3 style={{ color: "#4a006b", textAlign: "center" }}>
            Resumen de la compra de {user?.email}:
          </h3>
          <ul>
            {resumenCompra.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-details">
                  <span>{item.nombre}</span>
                  <span>x {item.quantity}</span>
                  <span>💰 ${(item.precio * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          <p id="total">
            🛒 Productos: {resumenCompra.reduce((acc, i) => acc + i.quantity, 0)} <br />
            💰 Total: $
            {resumenCompra
              .reduce((acc, item) => acc + item.precio * item.quantity, 0)
              .toFixed(2)}
          </p>
          <p
            style={{
              fontSize: "18px",
              textAlign: "center",
              color: "#4a006b",
              marginTop: "20px",
            }}
          >
            Gracias por tu compra, {user?.email} 💌. <br />
            🧾 Número de pedido: <strong>{numeroPedido}</strong>
          </p>
        </>
      ) : (
        <>
          {cart.length === 0 ? (
            <p style={{ textAlign: "center" }}>Tu carrito está vacío</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    {/* Datos del producto centrados */}
                    <div className="cart-details">
                      <span>{item.nombre}</span>
                      <span>x {item.quantity}</span>
                      <span>💰 ${(item.precio * item.quantity).toFixed(2)}</span>
                    </div>

                    {/* Botones de cantidad centrados */}
                    <div className="cart-qty">
                      <button
                        aria-label="Disminuir cantidad"
                        onClick={() => decreaseQty(item.id)}
                        className="carrito-boton"
                      >
                        ➖
                      </button>
                      <button
                        aria-label="Aumentar cantidad"
                        onClick={() => increaseQty(item.id)}
                        className="carrito-boton"
                      >
                        ➕
                      </button>
                      <button
                        aria-label="Eliminar producto"
                        onClick={() => removeFromCart(item.id)}
                        className="carrito-boton eliminar"
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total centrado */}
              <p id="total">
                🛒 Productos: {cartTotalItems} <br />
                💰 Total: ${cartTotalPrice.toFixed(2)}
              </p>

              {/* Botones principales centrados */}
              <div className="cart-actions">
                <button
                  className="carrito-boton finalizar"
                  onClick={finalizarCompra}
                >
                  Finalizar compra
                </button>
                <button
                  className="carrito-boton vaciar"
                  onClick={clearCart}
                >
                  Vaciar carrito
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}


