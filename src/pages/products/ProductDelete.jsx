import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import ProductPreview from "./ProductPreview";

export default function ProductDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  // Cargar datos del producto a eliminar
  useEffect(() => {
    api.get(`/productos/${id}`).then((res) => setProducto(res.data));
  }, [id]);

  async function handleDelete() {
    await api.delete(`/productos/${id}`);
    navigate("/productos");
  }

  return (
    <div>
      <h2>¿Seguro que quieres eliminar este producto?</h2>

      {/* Vista previa del producto */}
      {producto ? (
        <ProductPreview producto={producto} />
      ) : (
        <p>Cargando información del producto...</p>
      )}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleDelete} style={{ marginRight: "0.5rem", background: "red", color: "white" }}>
          Sí, eliminar
        </button>
        <button onClick={() => navigate("/productos")}>Cancelar</button>
      </div>
    </div>
  );
}