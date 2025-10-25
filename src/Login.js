import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  localStorage.setItem('usuario', username);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username);
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;