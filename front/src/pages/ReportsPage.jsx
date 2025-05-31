import { useEffect, useState } from "react";
import {
  getSalesSummary,
  getTopProducts,
  getLowStock,
  getTotalIncome,
  exportTopProducts,
  exportLowStock,
  exportSalesSummary,
} from "../services/api";
import "./ReportsPage.css";

const TOP_PRODUCTS = "TOP_PRODUCTS";
const LOW_STOCK_PRODUCTS = "LOW_STOCK_PRODUCTS";
const SALES_SUMMARY = "SALES_SUMMARY";

const ReportsPage = () => {
  const [period, setPeriod] = useState("day");
  const [summary, setSummary] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      const [summaryRes, topRes, lowRes, incomeRes] = await Promise.all([
        getSalesSummary(period),
        getTopProducts(),
        getLowStock(),
        getTotalIncome(),
      ]);
      setSummary(
        Object.entries(summaryRes.data).map(([fecha, datos]) => ({
          fecha,
          ...datos,
        }))
      );
      setTopProducts(topRes.data);
      setLowStock(lowRes.data);
      setIncome(incomeRes.data.total);
    } catch (err) {
      console.error("Error cargando reportes:", err);
    }
  };

  const handleExport = async (type) => {
    let promise;
    let filename;

    if (type === TOP_PRODUCTS) {
      promise = exportTopProducts();
      filename = "top_productos.csv";
    }

    if (type === LOW_STOCK_PRODUCTS) {
      promise = exportLowStock();
      filename = "productos_stock_bajo.csv";
    }
    if (type === SALES_SUMMARY) {
      promise = exportSalesSummary(period);
      filename = "sales_summary.csv";
    }

    try {
      const res = await promise;
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error exportando CSV:", err);
    }
  };

  return (
    <div className="reports-container">
      <h1>Panel de Reportes</h1>

      <div className="report-section">
        <label>
          Resumen por:
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="day">Día</option>
            <option value="week">Semana</option>
            <option value="month">Mes</option>
          </select>
        </label>
      </div>

      <div className="report-grid">
        <div className="report-card">
          <h3>Resumen de Ventas</h3>
          <ul>
            {summary.map((item, i) => (
              <li key={i}>
                Fecha: {item.fecha} - Ventas: {item.totalVentas} - Ingresos: ${" "}
                {item.totalIngreso.toFixed(2)}
              </li>
            ))}
          </ul>
          <button
            className="export-button"
            onClick={() => handleExport(SALES_SUMMARY)}
          >
            Exportar CSV
          </button>
        </div>

        <div className="report-card">
          <h3>Productos Más Vendidos</h3>
          <ul>
            {topProducts.map((prod, i) => (
              <li key={i}>
                {prod.nombre_producto} - {prod.totalVendido || prod.cantidad}{" "}
                vendidos
              </li>
            ))}
          </ul>
          <button
            className="export-button"
            onClick={() => handleExport(TOP_PRODUCTS)}
          >
            Exportar CSV
          </button>
        </div>

        <div className="report-card">
          <h3>Productos con Bajo Stock</h3>
          <ul>
            {lowStock.map((prod, i) => (
              <li key={i}>
                {prod.nombre_producto} - Stock: {prod.cantidad_stock}
              </li>
            ))}
          </ul>
          <button
            className="export-button"
            onClick={() => handleExport(LOW_STOCK_PRODUCTS)}
          >
            Exportar CSV
          </button>
        </div>

        <div className="total-ingresos-card">
          <h3>Total de Ingresos</h3>
          <p>${income.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
