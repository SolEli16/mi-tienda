// 📂 src/pages/Login.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  // ✅ Si ya está logueado, redirige al catálogo
  if (user) return <Navigate to="/productos" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email); // guarda usuario en contexto y localStorage
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "40px" }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
