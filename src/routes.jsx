import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductsList from "./pages/products/ProductsList";
import ProductForm from "./pages/products/ProductForm";
import ProductDelete from "./pages/products/ProductDelete";
import ColorsList from "./pages/colors/ColorsList";
import MaterialsList from "./pages/materials/MaterialsList";
import PrivateRoute from "./components/PrivateRoute";

export default function RoutesApp() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard protegido */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Productos CRUD */}
      <Route
        path="/productos"
        element={
          <PrivateRoute>
            <ProductsList />
          </PrivateRoute>
        }
      />
      <Route
        path="/productos/nuevo"
        element={
          <PrivateRoute>
            <ProductForm mode="new" />
          </PrivateRoute>
        }
      />
      <Route
        path="/productos/editar/:id"
        element={
          <PrivateRoute>
            <ProductForm mode="edit" />
          </PrivateRoute>
        }
      />
      <Route
        path="/productos/eliminar/:id"
        element={
          <PrivateRoute>
            <ProductDelete />
          </PrivateRoute>
        }
      />

      {/* Colores CRUD (todo en una sola vista) */}
      <Route
        path="/colores"
        element={
          <PrivateRoute>
            <ColorsList />
          </PrivateRoute>
        }
      />

      {/* Materiales CRUD (todo en una sola vista) */}
      <Route
        path="/materiales"
        element={
          <PrivateRoute>
            <MaterialsList />
          </PrivateRoute>
        }
      />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}