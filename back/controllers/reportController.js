const fs = require("fs");
const path = require("path");
const { generateCSV } = require("../utils/exportHelpers");
const { formatearMoneda } = require("../utils/formatearModena");
const salesPath = path.join(__dirname, "../data/sales.json");
const inventoryPath = path.join(__dirname, "../data/inventory.json");

function readSales() {
  try {
    return JSON.parse(fs.readFileSync(salesPath, "utf-8"));
  } catch {
    return [];
  }
}

function readInventory() {
  try {
    return JSON.parse(fs.readFileSync(inventoryPath, "utf-8"));
  } catch {
    return [];
  }
}

function validateSalesData(sales) {
  if (!Array.isArray(sales)) return [];

  return sales.filter((sale, index) => {
    if (
      !sale.fecha_venta ||
      !Array.isArray(sale.detalles) ||
      sale.detalles.length === 0
    ) {
      console.warn(`Venta inválida en posición ${index}:`, sale);
      return false;
    }

    const detallesValidos = sale.detalles.every(
      (item) =>
        item.nombre_producto &&
        typeof item.cantidad_vendida === "number" &&
        typeof item.precio_total === "number"
    );

    if (!detallesValidos) {
      console.warn(`Detalles inválidos en venta ID ${sale.id_venta || index}`);
    }

    return detallesValidos;
  });
}

function salesSummary(period = "day") {
  const sales = validateSalesData(readSales());
  const grouped = {};

  sales.forEach((sale) => {
    const date = new Date(sale.fecha_venta);

    if (isNaN(date.getTime())) {
      console.warn(
        `Fecha inválida encontrada: "${sale.fecha_venta}" en venta ID ${sale.id_venta}`
      );
      return;
    }

    let key;
    switch (period) {
      case "week":
        const onejan = new Date(date.getFullYear(), 0, 1);
        const weekNum = Math.ceil(
          ((date - onejan) / 86400000 + onejan.getDay() + 1) / 7
        );
        key = `${date.getFullYear()}-W${weekNum}`;
        break;
      case "month":
        key = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        break;
      default:
        key = date.toISOString().slice(0, 10);
    }

    if (!grouped[key]) {
      grouped[key] = { totalVentas: 0, totalIngreso: 0 };
    }

    grouped[key].totalVentas += sale.detalles.reduce(
      (acc, item) => acc + item.cantidad_vendida,
      0
    );

    grouped[key].totalIngreso += sale.detalles.reduce(
      (acc, item) => acc + item.precio_total,
      0
    );
  });

  return grouped;
}

function topSellingProducts(topN = 5) {
  const sales = validateSalesData(readSales());
  const productSales = {};

  sales.forEach((sale) => {
    sale.detalles.forEach((item) => {
      if (!productSales[item.nombre_producto]) {
        productSales[item.nombre_producto] = 0;
      }
      productSales[item.nombre_producto] += item.cantidad_vendida;
    });
  });

  return Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([nombre_producto, cantidad]) => ({ nombre_producto, cantidad }));
}

function lowStockProducts(threshold = 5) {
  const inventory = readInventory();
  const products = inventory.filter((item) => item.cantidad_stock <= threshold);

  return products.map((item) => ({
    nombre_producto: item.nombre_producto,
    cantidad: item.cantidad_stock,
  }));
}

function totalIncome() {
  const sales = validateSalesData(readSales());

  return sales.reduce((acc, sale) => {
    const totalVenta = sale.detalles.reduce(
      (acc2, item) => acc2 + item.precio_total,
      0
    );
    return acc + totalVenta;
  }, 0);
}

function exportTopProducts(req, res) {
  const data = topSellingProducts(10);
  const columns = ["nombre_producto", "cantidad"];

  const csv = generateCSV(data, columns);
  res.setHeader("Content-Disposition", "attachment; filename=top-products.csv");
  res.setHeader("Content-Type", "text/csv");
  res.send(csv);
}

function exportLowStockProduct(req, res) {
  const data = lowStockProducts(5);
  const columns = ["nombre_producto", "cantidad"];

  const csv = generateCSV(data, columns);
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=low-stock-products.csv"
  );
  res.setHeader("Content-Type", "text/csv");
  res.send(csv);
}

function exportSalesSummary(req, res) {
  const data = Object.entries(salesSummary(req.query.period)).map(
    ([fecha, datos]) => ({
      fecha,
      cantidad_de_ventas: datos.totalVentas,
      ingresos: formatearMoneda(datos.totalIngreso),
    })
  );
  console.log(data);
  const columns = ["fecha", "cantidad_de_ventas", "ingresos"];

  const csv = generateCSV(data, columns);
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=sales-summary.csv"
  );
  res.setHeader("Content-Type", "text/csv");
  res.send(csv);
}

module.exports = {
  salesSummary,
  topSellingProducts,
  lowStockProducts,
  totalIncome,
  exportTopProducts,
  exportLowStockProduct,
  exportSalesSummary,
};
