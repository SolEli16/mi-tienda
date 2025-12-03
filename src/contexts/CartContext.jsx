// 📂 /src/contexts/CartContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

// ✅ Hook personalizado para consumir el contexto
export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 🧠 Cargar carrito guardado al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("carrito");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 💾 Guardar carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  // ➕ Agregar producto
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // ➖ Disminuir cantidad (si llega a 1 y se resta, se elimina)
  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // 👈 elimina si llega a 0
    );
  };

  // ➕ Aumentar cantidad
  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ❌ Quitar producto
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 🧹 Vaciar carrito
  const clearCart = () => setCart([]);

  // 💰 Calcular total de productos y precio
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.precio,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        cartTotalItems,
        cartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
