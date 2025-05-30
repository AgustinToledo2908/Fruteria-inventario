const express = require("express");
const router = express.Router();

const {
  salesSummary,
  topSellingProducts,
  lowStockProducts,
  totalIncome,
  exportTopProducts,
  exportLowStockProduct,
  exportSalesSummary,
} = require("../controllers/reportController");

router.get("/sales-summary", (req, res) => {
  const period = req.query.period || "day";

  if (!["day", "week", "month"].includes(period)) {
    return res.status(400).json({ message: "Periodo inválido" });
  }

  const data = salesSummary(period);
  res.json(data);
});

router.get("/top-products", (req, res) => {
  const top = parseInt(req.query.top) || 5;
  const data = topSellingProducts(top);
  res.json(data);
});

router.get("/low-stock", (req, res) => {
  const threshold = parseInt(req.query.threshold) || 5;
  const data = lowStockProducts(threshold);
  res.json(data);
});

router.get("/total-income", (req, res) => {
  const total = totalIncome();
  res.json({ total });
});

router.get("/export-top-products", exportTopProducts);
router.get("/export-low-stock", exportLowStockProduct);
router.get("/export-sales-summary", exportSalesSummary);

module.exports = router;
