// 📂 src/pages/Login.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // 👈 nuevo campo

  // ✅ Si ya está logueado, redirige al catálogo
  if (user) return <Navigate to="/productos" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // ⚠️ Password no se valida en este login simulado, pero se incluye para estética
    login(email); // guarda usuario en contexto y localStorage
  };

  return (
    <div className="login-container">
      <h2>🔐 Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
