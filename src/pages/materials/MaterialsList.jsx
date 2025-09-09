import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import "../../styles/ColorsMaterialsList.css";

export default function MaterialsList() {
  const [materiales, setMateriales] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMateriales();
  }, []);

  async function fetchMateriales() {
    const res = await api.get("/materiales");
    setMateriales(res.data);
  }

  async function handleSubmit(e, id) {
    e.preventDefault();
    if (id) {
      await api.put(`/materiales/${id}`, { nombre });
    } else {
      await api.post("/materiales", { nombre });
    }
    setNombre("");
    setEditId(null);
    fetchMateriales();
  }

  function handleEdit(m) {
    setNombre(m.nombre);
    setEditId(m.id);
  }

  return (
    <div className="products-container">
      {/* Botón para volver al dashboard */}
      <Link to="/dashboard" className="back-dashboard">
        Volver al Dashboard
      </Link>

      <h2>Materiales</h2>

      {/* Formulario para agregar */}
      <form onSubmit={(e) => handleSubmit(e, null)} className="inline-form">
        <input
          value={editId ? "" : nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del material"
          required
          disabled={!!editId} // desactivar si estás editando
        />
        <button type="submit" disabled={!!editId}>
          Agregar
        </button>
      </form>

      {/* Lista */}
      <ul className="products-list">
        {materiales.map((m) => (
          <li key={m.id}>
            <span className="product-info">{m.nombre}</span>
            <div className="actions">
              <button onClick={() => handleEdit(m)}>Editar</button>
            </div>

            {/* Si está en edición, mostrar formulario justo debajo */}
            {editId === m.id && (
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