import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import AddProductPage from "./pages/AddProductPage";
import SalesPage from "./pages/SalesPage";
import ReportsPage from "./pages/ReportsPage";
import DashboardLayout from "./components/DashboardLayout";
function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<InventoryPage />} />
          <Route path="/agregar" element={<AddProductPage />} />
          <Route path="/ventas" element={<SalesPage />} />
          <Route path="/reportes" element={<ReportsPage />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
