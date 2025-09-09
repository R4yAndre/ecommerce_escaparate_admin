import { useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password: pass });

      // Guardar token
      login(res.data.token);

      // Confirmación en consola
      console.log("Token guardado:", localStorage.getItem("admin_auth"));

      // Redirigir
      navigate("/dashboard");
    } catch (err) {
      console.error("Error en login:", err.response?.data || err.message);
      alert("Credenciales inválidas o error en el servidor");
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Iniciar sesión</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}