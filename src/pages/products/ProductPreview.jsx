import "./../../styles/ProductPreview.css";

export default function ProductPreview({ producto }) {
  if (!producto.nombre) return null;
  return (
    <div className="product-preview">
      <h4>Vista previa</h4>
      <p><strong>Nombre:</strong> {producto.nombre}</p>
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
      <p><strong>Precio:</strong> {producto.precio}</p>
      {producto.url_imagen && (
        <div>
          <img 
            src={producto.url_imagen} 
            alt={producto.nombre}
          />
        </div>
      )}
    </div>
  );
}