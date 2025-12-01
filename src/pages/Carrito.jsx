import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Carrito() {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [resumenCompra, setResumenCompra] = useState([]);
  const [numeroPedido, setNumeroPedido] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const finalizarCompra = () => {
    const nuevoPedido = "PED-" + Date.now().toString().slice(-6);
    setNumeroPedido(nuevoPedido);
    setResumenCompra(cart);
    clearCart();
    setCompraFinalizada(true);
  };

  return (
    <div className="container">
      <h2>🧺 Carrito</h2>

      {compraFinalizada ? (
        <>
          <h3 style={{ color: "#4a006b" }}>
            Resumen de la compra de {user?.email}:
          </h3>
          <ul>
            {resumenCompra.map((item, index) => (
              <li key={index}>
                {item.title} x {item.quantity} = ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p id="total">
            💰 Total: $
            {resumenCompra
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
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
            <p>Tu carrito está vacío</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.title} x {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                    <div>
                      <button onClick={() => decreaseQty(item.id)}>➖</button>
                      <button onClick={() => increaseQty(item.id)}>➕</button>
                      <button onClick={() => removeFromCart(item.id)}>❌</button>
                    </div>
                  </li>
                ))}
              </ul>

              <p id="total">💰 Total: ${total.toFixed(2)}</p>

              <button
                style={{
                  marginTop: "10px",
                  backgroundColor: "#cd20f8",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={finalizarCompra}
              >
                Finalizar compra
              </button>
              <button
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={clearCart}
              >
                Vaciar carrito
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
