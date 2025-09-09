import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import ProductPreview from "./ProductPreview";
import "../../styles/ProductForm.css"; 
import axios from "axios";

export default function ProductForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    id_categoria: "",
    id_color: "",
    id_material: "",
    url_imagen: "",
  });

  const [colores, setColores] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && id) {
      api.get(`/productos/${id}`).then((res) => setProducto(res.data));
    }
  }, [id, mode]);

  useEffect(() => {
    api.get("/colores").then((res) => setColores(res.data));
    api.get("/materiales").then((res) => setMateriales(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["id_categoria", "id_material", "id_color"];
    setProducto({
      ...producto,
      [name]: numericFields.includes(name) ? Number(value) : value,
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Selecciona una imagen primero.");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "subir_imagen_ropa"); // reemplaza con tu preset
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dlwdczi8r/image/upload", // reemplaza con tu cloud_name
        formData
      );
      setProducto({ ...producto, url_imagen: res.data.secure_url });
    } catch (err) {
      console.error("Error subiendo imagen:", err);
      alert("No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!producto.url_imagen) return alert("Sube la imagen antes de guardar.");
    if (mode === "edit") {
      await api.put(`/productos/${id}`, producto);
    } else {
      await api.post("/productos", producto);
    }
    navigate("/productos");
  };

  return (
    <div className="product-form-container">
      <Link to="/productos" className="back-products">
        Volver a Productos
      </Link>

      <div className="form-preview-wrapper">
        {/* Formulario */}
        <div className="product-form">
          <h2>{mode === "edit" ? "Editar" : "Agregar"} Producto</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <textarea
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
            />
            <input
              name="precio"
              type="number"
              value={producto.precio}
              onChange={handleChange}
              placeholder="Precio"
            />

            <select
              name="id_categoria"
              value={producto.id_categoria || ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value={1}>Hombre</option>
              <option value={2}>Mujer</option>
            </select>

            <select
              name="id_color"
              value={producto.id_color || ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un color</option>
              {colores.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>

            <select
              name="id_material"
              value={producto.id_material || ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un material</option>
              {materiales.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>

            <div className="cloudinary-section">
              <label>Imagen del producto:</label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("fileInput").click()}
                  className="file-select-button"
                >
                  {file ? file.name : "Selecciona una imagen"}
                </button>
              </div>
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Subiendo..." : "Subir a Cloudinary"}
              </button>
            </div>

            <div>
              <label>URL de la imagen:</label>
              <input
                type="text"
                value={producto.url_imagen}
                readOnly
                placeholder="Aquí aparecerá la URL después de subir"
              />
            </div>

            <button type="submit">Guardar</button>
          </form>
        </div>

        {/* ProductPreview sin contenedor extra */}
        <ProductPreview producto={producto} />
      </div>
    </div>
  );
}