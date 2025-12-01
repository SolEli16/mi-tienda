import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🧠 Cargar usuario guardado al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 🔐 Login simulado
  const login = (email) => {
    const newUser = { email };
    setUser(newUser);
    localStorage.setItem("usuario", JSON.stringify(newUser));
  };

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuario");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
