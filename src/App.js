// 📂 src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 👈 BrowserRouter
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Home from "./Home";
import Productos from "./Productos";
import ProductDetail from "./ProductDetail";
import Reseñas from "./Reseñas";
import Contacto from "./Contacto";
import Login from "./pages/Login";
import Carrito from "./pages/Carrito";
import AdminProductos from "./pages/AdminProductos";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalStyles from "./styles/globalStyles";

// import { seedProductos } from "./utils/seedProductos";

function App() {
  useEffect(() => {
    // ⚠️ Ejecutar solo una vez para poblar MockAPI con productos
    // seedProductos();
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <Router>
              <Helmet>
                <title>Talento Tech Shop</title>
                <meta
                  name="description"
                  content="Proyecto final React - eCommerce con carrito, CRUD y autenticación"
                />
              </Helmet>

              <GlobalStyles />
              <Navbar />

              <main
                style={{
                  backgroundImage: 'url("/fondo.png")',
                  backgroundSize: "cover",
                  backgroundAttachment: "fixed",
                  backgroundPosition: "center",
                  minHeight: "100vh",
                  paddingBottom: "40px",
                }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/productos" element={<Productos />} />
                  <Route path="/producto/:id" element={<ProductDetail />} />
                  <Route
                    path="/carrito"
                    element={
                      <ProtectedRoute>
                        <Carrito />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/reseñas" element={<Reseñas />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminProductos />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>

              <ToastContainer position="top-right" autoClose={2500} />
            </Router>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

