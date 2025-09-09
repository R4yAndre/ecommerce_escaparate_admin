import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import "../../styles/ColorsMaterialsList.module.css";

export default function ColorsList() {
  const [colores, setColores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchColores();
  }, []);

  async function fetchColores() {
    const res = await api.get("/colores");
    setColores(res.data);
  }

  async function handleSubmit(e, id) {
    e.preventDefault();
    if (id) {
      await api.put(`/colores/${id}`, { nombre });
    } else {
      await api.post("/colores", { nombre });
    }
    setNombre("");
    setEditId(null);
    fetchColores();
  }

  function handleEdit(c) {
    setNombre(c.nombre);
    setEditId(c.id);
  }

  return (
    <div className="products-container">
      {/* Botón para volver al dashboard */}
      <Link to="/dashboard" className="back-dashboard">
        Volver al Dashboard
      </Link>

      <h2>Colores</h2>

      {/* Formulario para agregar */}
      <form onSubmit={(e) => handleSubmit(e, null)} className="inline-form">
        <input
          value={editId ? "" : nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del color"
          required
          disabled={!!editId} // desactivar si estás editando
        />
        <button type="submit" disabled={!!editId}>
          Agregar
        </button>
      </form>

      {/* Lista */}
      <ul className="products-list">
        {colores.map((c) => (
          <li key={c.id}>
            <span className="product-info">{c.nombre}</span>
            <div className="actions">
              <button onClick={() => handleEdit(c)}>Editar</button>
            </div>

            {/* Si está en edición, mostrar formulario justo debajo */}
            {editId === c.id && (
              <form
                onSubmit={(e) => handleSubmit(e, editId)}
                className="inline-edit-form"
              >
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
                <button type="submit">Actualizar</button>
                <button
                  type="button"
                  onClick={() => {
                    setNombre("");
                    setEditId(null);
                  }}
                >
                  Cancelar
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}