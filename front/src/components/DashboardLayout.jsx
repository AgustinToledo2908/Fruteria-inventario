import { Link } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Frutería</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Inventario</Link>
            </li>
            <li>
              <Link to="/agregar">Agregar Producto</Link>
            </li>
            <li>
              <Link to="/ventas">Registrar Venta</Link>
            </li>
            <li>
              <Link to="/reportes">Reportes</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
