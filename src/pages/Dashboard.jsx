import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de Administración</h1>
      <nav className="dashboard-nav">
        <Link to="/productos" className="dashboard-link">
          Productos
        </Link>
        <button onClick={logout} className="dashboard-button logout">
          Cerrar sesión
        </button>
      </nav>
    </div>
  );
}