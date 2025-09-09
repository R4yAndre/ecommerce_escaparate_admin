import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import "../../styles/ProductsList.css";

export default function ProductsList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get("/productos").then((res) => setProductos(res.data));
  }, []);

  return (
    <div className="products-container">
      {/* Botón para volver al dashboard */}
      <Link to="/dashboard" className="back-dashboard">
        Volver al Dashboard
      </Link>

      <h2>Productos</h2>
      <Link to="/productos/nuevo" className="add-button">
        Agregar Producto
      </Link>
      <ul className="products-list">
        {productos.map((p) => (
          <li key={p.id}>
            <span className="product-info">
              {p.nombre} - S/.{p.precio}
            </span>
            <div className="actions">
              <Link to={`/productos/editar/${p.id}`}>Editar</Link>
              <Link to={`/productos/eliminar/${p.id}`}>Eliminar</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}